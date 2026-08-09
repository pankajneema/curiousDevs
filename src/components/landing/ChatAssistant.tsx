import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ChevronUp, RotateCcw, Send, X } from "lucide-react";
import { Mascot } from "./Mascot";

type Step = "role" | "faq" | "service" | "done";
type Message = { from: "assistant" | "user"; text: string };

const roleChoices = [
  "Founder / CEO",
  "CTO / Engineering",
  "Product / Operations",
  "Just exploring",
  "I have a question first",
];
const serviceChoices = [
  "Build AI",
  "AI Audit / Assessment",
  "Fix existing AI",
  "Scale to production",
];
const faqChoices = [
  "What does CuriousDevs do?",
  "What is AI Audit / Assessment?",
  "Can you build RAG or agents?",
  "How do you improve an existing AI system?",
  "What does Scale include?",
  "How do you handle security?",
  "How does pricing work?",
  "Which industries do you serve?",
];

const faqAnswers: Record<string, string> = {
  "what does curiousdevs do?":
    "CuriousDevs AI-native products build karta hai aur existing AI ko reliable, secure, measurable aur production-ready banata hai.",
  "what is ai audit / assessment?":
    "AI Audit / Assessment ek clear health-check hai: accuracy, RAG, agents, security, cost, latency aur observability review karke scorecard aur next-step report milti hai.",
  "can you build rag or agents?":
    "Yes. Hum RAG apps, knowledge copilots, AI agents, tool workflows, memory, state aur multi-agent systems build kar sakte hain.",
  "how do you improve an existing ai system?":
    "Pehle baseline aur failure map banate hain, phir highest-value issue fix karte hain, aur comparable tests se result verify karte hain.",
  "what does scale include?":
    "Scale me backend, Docker/Kubernetes, CI/CD, model routing, caching, observability, deployment, runbooks aur team handover aa sakte hain.",
  "how do you handle security?":
    "Prompt injection, tool permissions, data leakage, unsafe actions, access control aur fallback behavior ko review aur test karte hain.",
  "how does pricing work?":
    "Abhi fixed public pricing nahi hai. Founding cohort me scope, complexity, data access, risk aur success criteria samajhne ke baad proposal dete hain.",
  "which industries do you serve?":
    "Fintech, healthcare, SaaS, retail, logistics, education, manufacturing aur government teams ke AI workflows ke saath kaam kar sakte hain.",
  "do you build ai products?":
    "Yes, idea se production tak: product workflow, architecture, backend, AI behavior, evaluation, security aur deployment.",
  "do you review existing ai?":
    "Yes. AI Audit / Assessment se pehle samajhte hain ki system me actual problem kya hai aur fix ka priority order kya hona chahiye.",
  "can you fix hallucinations?":
    "Usually root cause retrieval, grounding, prompt flow ya evaluation me hota hai. Hum cause identify karke measurable fix implement karte hain.",
  "can you improve rag?":
    "Haan. Chunking, metadata, hybrid search, reranking, citations, retrieval quality aur test set par kaam karte hain.",
  "can you improve agents?":
    "Haan. Tool access, state, retries, handoffs, edge cases, trajectory tests aur human approval flow review karte hain.",
  "can you reduce ai cost?":
    "Model routing, semantic caching, payload optimization, token attribution aur usage visibility ke through cost control kar sakte hain.",
  "can you reduce latency?":
    "Critical path ko measure karke slow retrieval, model, integration ya payload step isolate karte hain, phir targeted optimization karte hain.",
  "how do you measure quality?":
    "Representative test set, baseline, edge cases aur regression checks define karke before/after evidence ke saath result measure karte hain.",
  "how long does a project take?":
    "Timeline scope par depend karta hai. Assessment short diagnostic ho sakta hai; Build, Fix aur Scale engagements discovery ke baad define hote hain.",
  "do you work with existing teams?":
    "Yes. Hum scoped workstream own kar sakte hain, aapki engineering team ke saath collaborate kar sakte hain, ya specialist support de sakte hain.",
  "do you handle private data?":
    "Data access, credentials, retention aur handling project scope aur written terms me clearly define karte hain. Least-privilege access preferred hai.",
  "how can i contact you?":
    "Chat me details share kar dijiye ya Contact page par form fill kijiye. Team aapko next step ke saath reply karegi.",
};

const welcome: Message = {
  from: "assistant",
  text: "Hi! Main CuriousDevs ka assistant hoon. Aap kaun hain, aur AI ke saath kis stage par ho?",
};

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [step, setStep] = useState<Step>("role");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState({ role: "", service: "" });
  const [lead, setLead] = useState({ name: "", email: "", phone: "", reason: "" });
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [settled, setSettled] = useState(false);
  const [autoJump, setAutoJump] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const moved = useRef(false);
  const pointerActivated = useRef(false);
  const assistantSize = 96;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const jump = () => {
      setAutoJump(true);
      window.setTimeout(() => setAutoJump(false), 650);
    };
    const interval = window.setInterval(jump, 4200);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const clampToViewport = () => {
      setPosition(
        (current) =>
          current && {
            x: Math.min(Math.max(16, current.x), window.innerWidth - assistantSize - 16),
            y: Math.min(Math.max(16, current.y), window.innerHeight - assistantSize - 16),
          },
      );
    };
    window.addEventListener("resize", clampToViewport);
    return () => window.removeEventListener("resize", clampToViewport);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (event: PointerEvent) => {
      const nextX = Math.min(
        Math.max(16, dragStart.current.left + event.clientX - dragStart.current.x),
        window.innerWidth - assistantSize - 16,
      );
      const nextY = Math.min(
        Math.max(16, dragStart.current.top + event.clientY - dragStart.current.y),
        window.innerHeight - assistantSize - 16,
      );
      if (
        Math.abs(event.clientX - dragStart.current.x) > 4 ||
        Math.abs(event.clientY - dragStart.current.y) > 4
      )
        moved.current = true;
      setPosition({ x: nextX, y: nextY });
    };
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop, { once: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
  }, [dragging]);

  const addMessages = (userText: string, assistantText: string) => {
    setMessages((current) => [
      ...current,
      { from: "user", text: userText },
      { from: "assistant", text: assistantText },
    ]);
  };

  const selectRole = (role: string) => {
    if (role === "I have a question first") {
      addMessages(
        role,
        "Bilkul. Neeche common questions hain; aap ek choose kar sakte hain ya apna question type kar sakte hain.",
      );
      setStep("faq");
      return;
    }
    setProfile((current) => ({ ...current, role }));
    addMessages(
      role,
      "Nice to meet you. Aap CuriousDevs ke kis service ke baare mein jaana chahte hain?",
    );
    setStep("service");
  };

  const answerQuestion = (question: string) => {
    const answer =
      faqAnswers[question.toLowerCase()] ??
      "Iska short answer dene ke liye thoda context chahiye. Aap apna AI workflow ya problem describe kar dijiye, team uske hisaab se guide karegi.";
    addMessages(question, answer);
  };

  const continueFromFaq = () => {
    addMessages(
      "Continue",
      "Great. Aap CuriousDevs ke kis service ke baare mein jaana chahte hain?",
    );
    setStep("service");
  };

  const selectService = (service: string) => {
    setProfile((current) => ({ ...current, service }));
    addMessages(
      service,
      `Perfect, ${lead.name || "thanks"}. Note kar liya — CuriousDevs team aapke ${service.toLowerCase()} interest ke hisaab se ${lead.email} par next step share karegi.`,
    );
    setStep("done");
  };

  const submitText = () => {
    const value = input.trim();
    if (!value) return;
    setInput("");
    if (step === "faq") {
      const answer =
        faqAnswers[value.toLowerCase()] ??
        "Good question. Iska answer context par depend karega. Aap apna AI workflow, current problem, ya expected outcome share kar dijiye.";
      addMessages(value, answer);
    }
  };

  const reset = () => {
    setStep("role");
    setMessages([welcome]);
    setInput("");
    setProfile({ role: "", service: "" });
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lead.name.trim() || !lead.email.trim() || !lead.reason.trim()) return;
    setLead((current) => ({
      ...current,
      name: current.name.trim(),
      email: current.email.trim(),
      phone: current.phone.trim(),
      reason: current.reason.trim(),
    }));
    setOnboarded(true);
    setMessages([
      welcome,
      { from: "user", text: `I'm ${lead.name.trim()}` },
      {
        from: "assistant",
        text: `Thanks, ${lead.name.trim()}. What would you like to explore with CuriousDevs?`,
      },
    ]);
    setStep("role");
  };

  const choices = useMemo(() => {
    if (step === "role") return roleChoices;
    if (step === "faq") return faqChoices;
    if (step === "service") return serviceChoices;
    return [];
  }, [step]);

  const opensRight = position ? position.x > window.innerWidth / 2 : true;

  return (
    <div
      className={`fixed z-[60] ${position ? "top-0 left-0" : "right-4 bottom-4"} ${dragging ? "" : "transition-transform duration-200 ease-out"}`}
      style={
        position
          ? {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              willChange: "transform",
            }
          : undefined
      }
    >
      {open && (
        <section
          aria-label="CuriousDevs assistant"
          className={`absolute bottom-[calc(100%+12px)] w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-none border border-hairline bg-surface shadow-[0_18px_50px_rgba(10,20,36,0.18)] ${opensRight ? "right-0" : "left-0"}`}
        >
          <header className="flex items-center justify-between border-b border-hairline bg-surface-2 px-4 py-3">
            <div>
              <p className="text-sm font-semibold tracking-tight">
                {onboarded ? "Let's understand your AI work" : "Tell us a little about yourself"}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-none border border-hairline text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </header>

          {!onboarded ? (
            <form className="space-y-3 px-4 py-4" onSubmit={submitLead}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Share a few details so we can make this conversation useful for you.
              </p>
              <label className="block text-xs font-medium text-foreground">
                Name
                <input
                  required
                  value={lead.name}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-none border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-amber-accent/60"
                />
              </label>
              <label className="block text-xs font-medium text-foreground">
                Work email
                <input
                  required
                  type="email"
                  value={lead.email}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-none border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-amber-accent/60"
                />
              </label>
              <label className="block text-xs font-medium text-foreground">
                Phone number <span className="font-normal text-muted-foreground">(optional)</span>
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, phone: event.target.value }))
                  }
                  placeholder="+91 ..."
                  className="mt-1.5 w-full rounded-none border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-amber-accent/60"
                />
              </label>
              <label className="block text-xs font-medium text-foreground">
                What brings you here?
                <textarea
                  required
                  value={lead.reason}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, reason: event.target.value }))
                  }
                  placeholder="Tell us what you want to build, fix, or understand"
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-none border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-amber-accent/60"
                />
              </label>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-none bg-amber-accent px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90"
              >
                Start conversation <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <div className="max-h-[min(430px,calc(100vh-180px))] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[88%] rounded-none border px-3 py-2 text-[13px] leading-relaxed ${message.from === "user" ? "border-amber-accent/40 bg-amber-accent/10 text-foreground" : "border-hairline bg-surface-2 text-muted-foreground"}`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}

              {choices.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {choices.map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() =>
                        step === "role"
                          ? selectRole(choice)
                          : step === "faq"
                            ? answerQuestion(choice)
                            : selectService(choice)
                      }
                      className="rounded-none border border-hairline bg-surface px-3 py-2 text-left text-xs font-medium text-foreground hover:border-amber-accent/50 hover:bg-surface-2"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {step === "faq" && (
                <button
                  type="button"
                  onClick={continueFromFaq}
                  className="inline-flex items-center gap-2 pt-1 text-xs font-medium text-amber-accent hover:text-foreground"
                >
                  Continue and share your details <ArrowRight className="size-3.5" />
                </button>
              )}

              {step === "done" && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 text-xs font-medium text-amber-accent hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" /> Start again
                </button>
              )}
            </div>
          )}

          {onboarded && step === "faq" && (
            <form
              className="border-t border-hairline bg-surface-2/60 p-3"
              onSubmit={(event) => {
                event.preventDefault();
                submitText();
              }}
            >
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  type="text"
                  placeholder="Type your answer..."
                  className="min-w-0 flex-1 rounded-none border border-hairline bg-surface px-3 py-2 text-sm text-foreground outline-none focus-visible:border-amber-accent/60"
                />
                <button
                  type="submit"
                  aria-label="Send answer"
                  className="flex size-9 shrink-0 items-center justify-center rounded-none bg-amber-accent text-background hover:opacity-90"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      <button
        type="button"
        aria-label={open ? "Close CuriousDevs assistant" : "Open CuriousDevs assistant"}
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          const rect = event.currentTarget.getBoundingClientRect();
          dragStart.current = {
            x: event.clientX,
            y: event.clientY,
            left: rect.left,
            top: rect.top,
          };
          moved.current = false;
          setDragging(true);
        }}
        onClick={() => {
          if (pointerActivated.current) {
            pointerActivated.current = false;
            return;
          }
          setOpen((current) => {
            const next = !current;
            setSettled(next);
            return next;
          });
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
          if (!moved.current) {
            pointerActivated.current = true;
            setOpen((current) => {
              const next = !current;
              setSettled(next);
              return next;
            });
          }
        }}
        onPointerCancel={() => setDragging(false)}
        className={`group relative flex size-24 touch-none select-none cursor-grab items-center justify-center rounded-full border border-transparent bg-transparent shadow-none active:cursor-grabbing ${dragging ? "ring-2 ring-amber-accent/30" : ""}`}
      >
        <span
          className={`assistant-mascot relative block size-24 ${settled ? "assistant-mascot-seated" : ""} ${autoJump && !settled ? "assistant-mascot-auto-jump" : ""}`}
        >
          <Mascot seated={open} />
        </span>
        {open && (
          <ChevronUp className="absolute -right-1 -top-1 size-7 rounded-full border border-hairline bg-surface p-1.5 text-foreground shadow-[0_8px_18px_rgba(10,20,36,0.12)]" />
        )}
      </button>
    </div>
  );
}
