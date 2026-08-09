export const detailedFaqs = [
  {
    q: "Do you build AI systems from scratch, or only fix existing ones?",
    a: "Both. We build AI-native products such as RAG applications, autonomous AI agents, multi-agent systems, and AI-powered copilots from the ground up. We also audit, secure, evaluate, optimize, and scale existing AI systems in development or production.",
  },
  {
    q: "We already have an AI application. Can you work with our existing codebase?",
    a: "Yes. We first analyze your architecture, identify failure points, and recommend targeted engineering improvements. Where possible, we optimize the existing codebase rather than replacing it.",
  },
  {
    q: "Can you work with our existing engineering team?",
    a: "Yes. We collaborate with developers, AI/ML engineers, DevOps teams, and CTOs. We can own a specific AI engineering stream or work within your workflow through GitHub, documentation, reviews, and scheduled syncs.",
  },
  {
    q: "How do you know whether our AI actually works?",
    a: "We establish an evaluation baseline before major architectural changes. Depending on the system, we measure retrieval precision and recall, answer correctness, hallucination rate, agent task success, latency, token spend, security risks, and regression results.",
  },
  {
    q: "Can you guarantee that our AI will never hallucinate?",
    a: "No, and we will not pretend otherwise. We engineer systems to minimize, detect, and isolate hallucinations through better retrieval, grounding, guardrails, model routing, and fallback mechanisms. Critical workflows can use deterministic paths when confidence is low.",
  },
  {
    q: "Will our data be safe?",
    a: "We design around your security requirements. Depending on the engagement, this can include access controls, data minimization, secret management, encryption, isolated containers, private cloud or on-premise deployment, and restricted model flows.",
  },
  {
    q: "Do you need access to our production environment?",
    a: "Not necessarily. We follow least privilege. Development and evaluation happen in controlled staging environments, with production access requested only when strictly required and under agreed permissions.",
  },
  {
    q: "Can you deploy the AI system into our AWS, Azure, or GCP infrastructure?",
    a: "Yes. We work within your cloud provider to build production-ready infrastructure, including Docker, Kubernetes, CI/CD pipelines, observability, and evaluation harnesses.",
  },
  {
    q: "What happens if the AI works in development but fails after deployment?",
    a: "We investigate the gap between development and production, including data distribution, retrieval drift, concurrency, latency, infrastructure bottlenecks, prompts, and tool permissions. Then we reproduce and fix the production issue against a measurable baseline.",
  },
  {
    q: "Can you reduce our OpenAI, Anthropic, or Gemini API costs?",
    a: "Yes. We analyze token usage, model routing, semantic caching, payload size, and workflow design to reduce cost per request without sacrificing the required response quality.",
  },
  {
    q: "Do you only work with OpenAI models?",
    a: "No. We select models based on cost, privacy, latency, reliability, and task requirements. We can integrate commercial APIs or host open-source models in a private cloud.",
  },
  {
    q: "Can you build an AI agent that performs actions, not just chats?",
    a: "Yes. We build action-oriented agents that work with APIs, databases, external tools, and internal systems. High-risk operations can include human approval steps and strict permission limits.",
  },
  {
    q: "Can you build multi-agent systems?",
    a: "Yes, when multi-agent architecture provides a clear engineering advantage, such as Planner, Specialist, and Reviewer workflows. If one agent or a deterministic script is more reliable and cost-effective, we recommend that instead.",
  },
  {
    q: "Can you integrate AI with our CRM, ERP, or internal APIs?",
    a: "Yes. We build secure integrations with databases, internal REST or gRPC services, CRMs, ERPs, and third-party tools while maintaining strict authentication and scope boundaries.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines are defined before kickoff. Focused audits and optimization usually take 1 to 2 weeks. RAG applications, agents, and infrastructure builds typically take 3 to 8 or more weeks depending on scope.",
  },
  {
    q: "How much does a project cost?",
    a: "We use fixed-scope engagements rather than hourly billing. Indicative ranges are: Diagnostic Audits ₹75,000 to ₹1.5 Lakhs in India or $1,500 to $3,500 globally; Fix and Optimization ₹1.5 Lakhs to ₹3 Lakhs or $3,000 to $6,000; End-to-End Builds ₹2.5 Lakhs to ₹10 Lakhs+ or $6,000 to $25,000+.",
  },
  {
    q: "Do we have to pay for the entire project upfront?",
    a: "No. Major builds can use milestone payments: 40% at SOW signing and kickoff, 30% at prototype and evaluation dataset delivery, and 30% at production deployment and handover. Diagnostic audits under ₹1 Lakh or $2,000 are billed upfront.",
  },
  {
    q: "What happens if the scope changes during development?",
    a: "The Statement of Work defines the scope and technical boundaries, including up to two major workflow iteration cycles during prototyping. Additional features are handled through a formal Change Request or separate SOW.",
  },
  {
    q: "Do you provide the source code after the project?",
    a: "Yes. After final payment, we hand over ownership of source code, deployment configuration, evaluation datasets, infrastructure scripts, and operational runbooks as specified in the contract.",
  },
  {
    q: "What happens after you finish the project?",
    a: "You retain ownership with zero vendor lock-in and can hand the system to your internal team. We can also provide ongoing engineering support, feature expansion, and evaluation monitoring through a recurring engagement.",
  },
  {
    q: "What if AI is not actually the right solution for our problem?",
    a: "We will tell you directly. If a standard backend service, database query, or deterministic rule engine is cheaper, faster, and more reliable than an LLM, we will recommend that instead.",
  },
  {
    q: "Do you sign an NDA?",
    a: "Yes. Mutual Non-Disclosure Agreements are executed before reviewing proprietary codebases, system architectures, or sensitive business data.",
  },
  {
    q: "Can you work with early-stage startups?",
    a: "Yes. We partner with early-stage teams to build MVPs, improve early architectures, and turn validated manual workflows into reliable AI-native products.",
  },
  {
    q: "Do you work only with companies in India?",
    a: "No. CuriousDevs is based in Gurugram, India, and supports remote delivery for teams across North America, Europe, and the Middle East through dedicated international rate schedules.",
  },
  {
    q: "What makes CuriousDevs different from a traditional software development agency?",
    a: "We do not offer general web or mobile outsourcing. We are an AI Engineering Studio focused on the reliability layer around AI systems: Architect, Build, Evaluate, Secure, Deploy, and Scale. We focus on measurable performance in real production environments.",
  },
] as const;
