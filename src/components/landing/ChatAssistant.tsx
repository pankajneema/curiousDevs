import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, MessageSquare, RotateCcw, Send, X } from "lucide-react";
import { sendContactMessage } from "@/lib/actions";

type Step = "role" | "faq" | "area" | "done";
type Message = { from: "assistant" | "user"; text: string };

const roleChoices = [
  "Founder / CEO",
  "CTO / Engineering",
  "Product / Research",
  "Just exploring",
  "I have a question first",
];
const areaChoices = [
  "AI Engineering",
  "Intelligent Systems",
  "Robotics / DeepTech",
  "Janus",
  "Not sure yet",
];
const faqChoices = [
  "What does CuriousDevs do?",
  "What can you build today?",
  "What is Janus?",
  "Do you work on robotics?",
  "How do you measure quality?",
  "How do you handle security?",
  "Where are you based?",
  "How can I contact you?",
];

const faqAnswers: Record<string, string> = {
  "what does curiousdevs do?":
    "CuriousDevs intelligent systems research, engineer aur build karta hai. Aaj ka foundation production AI hai — LLMs, RAG, agents, automation, evaluation, security aur infrastructure.",
  "what can you build today?":
    "Production AI systems: LLM applications, RAG aur knowledge systems, AI agents, agentic workflows aur automation — evaluation, security, observability aur deployment ke saath.",
  "what is janus?":
    "Janus CuriousDevs ka proprietary technology direction hai — intelligent systems build, evaluate, deploy aur operate karne ke liye. Abhi in development hai, generally available nahi.",
  "do you work on robotics?":
    "Robotics ek research direction hai jiski taraf hum build kar rahe hain. Computer vision aur edge AI hum actively build kar rahe hain; AI hardware aur neurotechnology exploration hai.",
  "how do you measure quality?":
    "Evaluation sets, regression tests, security checks aur observability — pehle measure karte hain, phir trust.",
  "how do you handle security?":
    "Least privilege by default. Guardrails, tool permissions aur data boundaries system architecture ka part hote hain, baad ka add-on nahi.",
  "where are you based?":
    "Gurugram, India — aur remotely doosre regions ki teams ke saath bhi kaam karte hain.",
  "how can i contact you?":
    "Yahin chat me details share kijiye, Contact page ka form use kijiye, ya hello@curiousdevs.com par email kijiye.",
};

const FALLBACK =
  "Good question. Iska answer context par depend karta hai — aap kya build, fix ya explore kar rahe hain, thoda describe kar dijiye.";

const welcome: Message = {
  from: "assistant",
  text: "Hi! Main CuriousDevs ka assistant hoon. Aap kaun hain, aur kya build ya explore kar rahe hain?",
};

const fieldCls =
  "mt-1.5 w-full rounded-[var(--radius)] border border-hairline bg-surface-2 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-orange-bright";

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [step, setStep] = useState<Step>("role");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("");
  const [lead, setLead] = useState({ name: "", email: "", phone: "", reason: "" });

  const say = (...next: Message[]) => setMessages((current) => [...current, ...next]);

  const selectRole = (choice: string) => {
    if (choice === "I have a question first") {
      say(
        { from: "user", text: choice },
        {
          from: "assistant",
          text: "Bilkul. Neeche common questions hain — ek choose kijiye ya apna question type kijiye.",
        },
      );
      setStep("faq");
      return;
    }
    setRole(choice);
    say(
      { from: "user", text: choice },
      {
        from: "assistant",
        text: "Nice to meet you. Aap kis area ke baare mein baat karna chahte hain?",
      },
    );
    setStep("area");
  };

  const answerQuestion = (question: string) => {
    say(
      { from: "user", text: question },
      { from: "assistant", text: faqAnswers[question.toLowerCase()] ?? FALLBACK },
    );
  };

  const continueFromFaq = () => {
    say(
      { from: "user", text: "Continue" },
      { from: "assistant", text: "Great. Aap kis area ke baare mein baat karna chahte hain?" },
    );
    setStep("area");
  };

  const selectArea = async (area: string) => {
    say({ from: "user", text: area });
    setStep("done");
    try {
      await sendContactMessage({
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone || undefined,
          role: role || undefined,
          area,
          message: lead.reason,
          source: "Site assistant",
        },
      });
      say({
        from: "assistant",
        text: `Perfect, ${lead.name}. Note kar liya — CuriousDevs team ${lead.email} par ${area} ke baare mein reply karegi.`,
      });
    } catch {
      say({
        from: "assistant",
        text: "Abhi message send nahi ho paaya. Please hello@curiousdevs.com par email kar dijiye, ya Contact page ka form use kijiye.",
      });
    }
  };

  const submitText = () => {
    const value = input.trim();
    if (!value) return;
    setInput("");
    if (step === "faq") answerQuestion(value);
  };

  const reset = () => {
    setStep("role");
    setMessages([welcome]);
    setInput("");
    setRole("");
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = lead.name.trim();
    const email = lead.email.trim();
    const reason = lead.reason.trim();
    if (!name || !email || !reason) return;
    setLead((current) => ({ ...current, name, email, phone: current.phone.trim(), reason }));
    setOnboarded(true);
    setMessages([
      welcome,
      { from: "user", text: `I'm ${name}` },
      {
        from: "assistant",
        text: `Thanks, ${name}. Aap kaun hain, aur CuriousDevs ke saath kya explore karna chahte hain?`,
      },
    ]);
    setStep("role");
  };

  const choices = useMemo(() => {
    if (step === "role") return roleChoices;
    if (step === "faq") return faqChoices;
    if (step === "area") return areaChoices;
    return [];
  }, [step]);

  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      {open && (
        <section
          aria-label="CuriousDevs assistant"
          className="on-dark absolute right-0 bottom-[calc(100%+12px)] w-[min(370px,calc(100vw-32px))] overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-night shadow-[var(--shadow-3)]"
        >
          <header className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span
                className="live-dot size-1.5 rounded-full bg-orange-bright"
                aria-hidden="true"
              />
              <p className="text-sm font-medium tracking-tight">
                {onboarded ? "What are you working on?" : "Tell us a little about yourself"}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-full border border-hairline text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </header>

          {!onboarded ? (
            <form className="space-y-3 px-4 py-4" onSubmit={submitLead}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Share a few details so this conversation is useful — we'll reply by email.
              </p>
              <label className="block text-xs font-medium text-foreground">
                Name
                <input
                  required
                  value={lead.name}
                  onChange={(event) => setLead((c) => ({ ...c, name: event.target.value }))}
                  placeholder="Your name"
                  autoComplete="name"
                  className={fieldCls}
                />
              </label>
              <label className="block text-xs font-medium text-foreground">
                Work email
                <input
                  required
                  type="email"
                  value={lead.email}
                  onChange={(event) => setLead((c) => ({ ...c, email: event.target.value }))}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={fieldCls}
                />
              </label>
              <label className="block text-xs font-medium text-foreground">
                Phone number <span className="font-normal text-muted-foreground">(optional)</span>
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(event) => setLead((c) => ({ ...c, phone: event.target.value }))}
                  placeholder="+91 ..."
                  autoComplete="tel"
                  className={fieldCls}
                />
              </label>
              <label className="block text-xs font-medium text-foreground">
                What brings you here?
                <textarea
                  required
                  value={lead.reason}
                  onChange={(event) => setLead((c) => ({ ...c, reason: event.target.value }))}
                  placeholder="What you want to build, fix or explore"
                  rows={3}
                  className={`${fieldCls} resize-none`}
                />
              </label>
              <button type="submit" className="btn-primary w-full">
                Start conversation <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <div
              className="max-h-[min(430px,calc(100vh-180px))] space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[88%] rounded-[var(--radius-card)] border px-3 py-2 text-[13px] leading-relaxed ${message.from === "user" ? "border-orange-bright/40 bg-orange-bright/10 text-foreground" : "border-hairline bg-surface-2 text-foreground/80"}`}
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
                            : void selectArea(choice)
                      }
                      className="rounded-full border border-hairline px-3 py-1.5 text-left text-xs text-foreground transition-colors hover:border-orange-bright"
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
              className="border-t border-hairline p-3"
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
                  placeholder="Type your question..."
                  aria-label="Your question"
                  className="min-w-0 flex-1 rounded-full border border-hairline bg-surface-2 px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-orange-bright"
                />
                <button
                  type="submit"
                  aria-label="Send question"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-bright text-night hover:brightness-105"
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
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex size-12 items-center justify-center rounded-full bg-orange-bright text-night shadow-[var(--shadow-2)] transition-transform hover:-translate-y-0.5"
      >
        {open ? <X className="size-5" /> : <MessageSquare className="size-5" />}
      </button>
    </div>
  );
}
