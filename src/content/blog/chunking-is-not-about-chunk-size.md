---
title: "Chunking is not about chunk size"
slug: "chunking-is-not-about-chunk-size"
description: "Chunk size is the first thing everyone tunes and almost never the thing that is broken. What actually breaks in RAG retrieval, what the published numbers really say, and the measurement most teams are missing."
date: "2026-08-21"
category: "RAG"
author: "CuriousDevs"
targetQuery: "RAG chunking strategy production"
cluster: "A — RAG failure"
canonical: "https://www.curiousdevs.com/blog/chunking-is-not-about-chunk-size"
ogImage: "/og/chunking-is-not-about-chunk-size.png"
tags: ["RAG", "retrieval", "evaluation", "production AI"]
service: "audit"
---

Retrieval is returning the wrong passages. Someone opens the config file, finds `chunk_size = 512`, and changes it to 256. Recall gets slightly worse. They try 1024. It gets slightly better on the three questions they happen to test. The number stays at 1024 for the rest of the system's life and nobody can say why.

This loop is easy to recognise once you have seen it. It is not a stupid loop. Chunk size is the only variable in the retrieval pipeline that most teams have actually exposed as a knob, so it is the only one they turn.

The problem is that chunk size is a proxy for the thing that is broken, and a bad one.

## What actually breaks

Two failure shapes account for most of what gets misdiagnosed as a chunking problem.

**The orphaned reference.** The late chunking paper illustrates this with a Wikipedia article about Berlin. The first sentence says "Berlin." Every sentence after that says "the city," "its," "here." Split that document into fixed-size chunks and every chunk after the first one is a passage about an unnamed city. Embed it and you get a vector that points at *cities in general*, not at Berlin. A user asks "what is the population of Berlin," the chunk containing the population is a semantic near-miss, and it does not surface.

Nothing about that failure is fixed by changing 512 to 256. Smaller chunks orphan *more* references, not fewer.

**The split claim.** A policy document says a claim is reimbursable if it was filed within 90 days *and* the member was enrolled on the service date. Those two conditions sit in adjacent sentences. The chunk boundary lands between them.

Now retrieval works perfectly and the system is still wrong. The top-ranked chunk is genuinely the most relevant passage in the corpus. It just contains half a rule. The model reads it, sees no contradiction, and answers confidently that a claim filed on day 80 is reimbursable. The evaluation harness — if it is scoring the final answer, which most are — marks that as a retrieval success and a generation failure, and the team spends the next sprint on prompt engineering.

That is the expensive version of this bug. Not the wrong answer. The wrong diagnosis.

## What the evidence actually says

There is a real body of work on this now, and it is less triumphant than the blog posts summarising it.

Anthropic's contextual retrieval work prepends a short LLM-generated description of the parent document to each chunk before embedding. Their reported numbers, measured as 1 minus recall@20: a 5.7% failure rate at baseline, 3.7% with contextual embeddings, 2.9% once contextual BM25 is added alongside, and 1.9% with a reranker on top. Stated cost is $1.02 per million document tokens, one-time, using prompt caching.

Late chunking attacks the same problem from the other end — embed the whole document first with a long-context model, then pool the token embeddings into chunks afterwards, so every chunk's vector was computed while the surrounding text was still visible. On BeIR datasets at nDCG@10, averaged across three models, the paper reports naive 52.2 versus late 54.0 with fixed 256-token boundaries. Sentence boundaries: 52.4 versus 54.3.

Read those numbers carefully. That is a relative improvement of roughly three and a half percent.

It is real, it is reproducible, and it is not going to save a system that is failing badly. If your retrieval is returning garbage, a 3.5% relative lift in nDCG is not the fix. Something structural is wrong and you have not found it yet.

And the technique is not free of risk. A 2025 evaluation on NFCorpus found late chunking's benefit is sharply model-dependent: with Stella-V5 it was a wash (nDCG@5 of 0.445 late versus 0.443 early), while with BGE-M3 early chunking beat late chunking by a wide margin — 0.246 against 0.070. That is not a small regression. That is the technique collapsing on a model it does not suit. The same study found dynamic segmentation cost 2–4x the processing time of fixed-size splitting for marginal gains.

Jina's own follow-up on late chunking is franker than most vendor writing: there is no instance in their results where a weaker embedding model with late chunking beats a stronger model without it. It needs a model with at least 8k context. And they are explicit that it addresses context loss, not boundary placement — "it's not about finding the ideal breakpoints."

So: two techniques that help, both modestly, both with conditions attached, and one of which can go badly backwards on the wrong embedding model.

## The measurement gap underneath all of it

Here is what makes chunk-size tuning so seductive. You can do it in thirty seconds and it produces a number that moves.

What you cannot do in thirty seconds is answer the question that matters: *when the system gets an answer wrong, was the correct passage in the retrieved set or not?*

Most teams cannot answer that. They have an end-to-end evaluation — a set of questions, a set of expected answers, an LLM judge scoring similarity. What they do not have is a labelled retrieval set: for each question, which chunk or chunks actually contain the answer. Without that, retrieval failure and generation failure are indistinguishable from the outside, and every debugging session is a guess.

The fix is boring and it is not a library.

Take 50 questions from real usage. Not synthetic ones — real ones, with the vocabulary mismatches and the missing context that real users produce. For each, have someone who knows the corpus find the passage that answers it and record its identifier. That is a day of work, maybe two. It is the least glamorous day in the project and it is the one that pays.

Now you can compute recall@k. Now "we changed the chunking strategy" produces a number that means something. Now when recall@10 is 0.94 and users are still getting wrong answers, you know with certainty that chunking is not your problem and you can stop touching it.

We would rather spend the first week of a RAG engagement building that set than the first month tuning parameters against intuition. It measures slower and it converges faster.

## What we actually change first

In rough order, and this order matters more than any individual item:

Build the retrieval eval set and get a recall@k baseline. Everything below is unmeasurable without it.

Then chunk on document structure rather than character count. Headings, list items, table rows, clause boundaries. Most enterprise corpora are far more structured than the ingestion pipeline treats them — a PDF policy document run through a naive splitter throws away a hierarchy that was sitting right there in the markup. This costs engineering time and it is format-specific work that does not transfer between corpora. Budget for it honestly.

Then attach context to each chunk. The parent document title, the section heading path, the effective date. Cheap, deterministic, no LLM call needed, and it recovers a large share of what contextual retrieval buys — because a chunk that carries "Reimbursement Policy > Filing Deadlines > 2026 revision" in its header is no longer a passage about an unnamed thing.

Then add BM25 alongside the vector search. Semantic search is systematically weak on exact identifiers — error codes, part numbers, clause references, names. Hybrid retrieval is one of the few changes with a consistently positive record across the studies above, and the added cost is an index and some fusion logic.

Only then consider contextual retrieval or late chunking, and evaluate them on *your* corpus with *your* embedding model. Given the BGE-M3 result, treating either as a default rather than a hypothesis is how you ship a regression.

And overlap. Overlap is a real mitigation for split claims and it costs storage and retrieval latency in direct proportion. That trade is usually worth making and it should be a decision, not a default.

## The uncomfortable part

Some of this is not a chunking problem at all.

If the answer requires synthesising four sections of a 200-page document, no chunking strategy retrieves it, because there is no chunk that contains the answer. If the corpus contains three versions of the same policy and no metadata distinguishing them, retrieval will keep surfacing the wrong one no matter how the text is split. If the user's question is ambiguous, the retriever cannot resolve what the asker did not specify.

Those are scope and data problems wearing a chunking costume. They get fixed upstream or they do not get fixed. Recognising them early is worth more than any parameter you could tune, and it is worth checking before any parameter work.

Chunk size is a real parameter. It is just nowhere near the top of the list, and it is the first thing everyone touches.

## References

1. Günther et al., *Late Chunking: Contextual Chunk Embeddings Using Long-Context Embedding Models*, arXiv:2409.04701. <https://arxiv.org/pdf/2409.04701>
2. Anthropic, *Introducing Contextual Retrieval*. <https://www.anthropic.com/news/contextual-retrieval>
3. *Reconstructing Context*, arXiv:2504.19754. <https://arxiv.org/html/2504.19754v1>
4. Jina AI, *What Late Chunking Really Is & What It's Not: Part II*. <https://jina.ai/news/what-late-chunking-really-is-and-what-its-not-part-ii/>

---

CuriousDevs is an AI engineering studio in Gurugram, India. We build, audit, fix and scale AI systems for production — RAG failure like this is one of the recurring ways AI projects break before they reach it.
