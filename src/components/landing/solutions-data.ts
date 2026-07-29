export type Verdict = "DENY" | "ESCALATE" | "MODIFY" | "ALLOW";

export type Solution = {
  slug: string;
  name: string;
  tag: string;
  headline: string;
  accent: string;
  body: string;
  compliance: string[];
  scenarios: { n: string; title: string; risk: string; verdict: Verdict; response: string }[];
};

const verdictTone: Record<Verdict, string> = {
  DENY: "border-danger/40 bg-danger/10 text-danger",
  ESCALATE: "border-amber-accent/40 bg-amber-accent/10 text-amber-accent",
  MODIFY: "border-amber-soft/40 bg-amber-soft/10 text-amber-soft",
  ALLOW: "border-amber-soft/40 bg-amber-soft/10 text-amber-soft",
};

export function verdictClass(v: Verdict) {
  return verdictTone[v];
}

export const solutions: Solution[] = [
  {
    slug: "fintech",
    name: "Fintech & Banking",
    tag: "Fintech & Banking",
    headline: "AI agents moving money",
    accent: "at machine speed.",
    body: "Payment execution, fraud triage, lending automation and customer account access — all operating faster than any human review cycle.",
    compliance: ["RBI IT/cybersecurity guidelines", "PCI DSS", "DPDP Act, 2023", "SOC 2"],
    scenarios: [
      {
        n: "01",
        title: "Funds moved before any human sees it",
        risk: "Prompt injection coerces a payment agent into initiating a transfer to an attacker-controlled account — at the speed of an API call.",
        verdict: "DENY",
        response:
          "Network policy enforces an approved destination allowlist. No injected instruction can route funds outside it.",
      },
      {
        n: "02",
        title: "Customer account data returned out of scope",
        risk: "Support agents manipulated into surfacing card numbers, transaction histories, or account details beyond the authenticated session.",
        verdict: "MODIFY",
        response:
          "Sensitive field patterns are detected and stripped from agent responses before they reach the end user.",
      },
      {
        n: "03",
        title: "Refund and credit abuse at scale",
        risk: "Customer-service agents coerced into issuing credits systematically — undetected until end-of-month reconciliation.",
        verdict: "ESCALATE",
        response:
          "Transactions above threshold pause and wait for an explicit human approval. Agent aborts on timeout.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tag: "Healthcare",
    headline: "Patient data has one boundary:",
    accent: "the care relationship.",
    body: "Clinical assistants and patient-support agents sit next to some of the most sensitive data an organisation holds.",
    compliance: [
      "DPDP Act, 2023 (health data)",
      "HIPAA (for global deployments)",
      "ISO 27001",
      "SOC 2",
    ],
    scenarios: [
      {
        n: "01",
        title: "Cross-patient record access",
        risk: "A patient-support agent, given an ambiguous query, retrieves or discusses another patient's records, diagnoses or prescriptions.",
        verdict: "DENY",
        response:
          "Agents are scoped strictly to the authenticated care relationship. Cross-patient queries never reach the database.",
      },
      {
        n: "02",
        title: "Clinical actions without oversight",
        risk: "An agent modifies a record, schedules a procedure, or alters a care plan based on a single unverified instruction.",
        verdict: "ESCALATE",
        response:
          "Any action with direct clinical consequence is paused and routed to a clinician for review before it executes.",
      },
      {
        n: "03",
        title: "PHI leaking into outputs",
        risk: "Diagnosis codes, medication names or identifiers appear in a response to someone outside the authorised relationship.",
        verdict: "MODIFY",
        response:
          "Sensitive field patterns are detected and redacted before a response reaches the end user or gets logged.",
      },
    ],
  },
  {
    slug: "enterprise-saas",
    name: "Enterprise SaaS & IT",
    tag: "Enterprise SaaS & IT",
    headline: "Coding and ops agents get",
    accent: "exactly the access they need.",
    body: "Internal-tooling and coding agents are given broad, standing access because it's convenient. That's the gap.",
    compliance: ["SOC 2", "ISO 27001", "DPDP Act, 2023", "Customer DPAs"],
    scenarios: [
      {
        n: "01",
        title: "Lateral movement through internal tools",
        risk: "A compromised or confused productivity agent pivots from its intended scope into code repos, HR systems or internal APIs.",
        verdict: "DENY",
        response:
          "Every tool call is checked against a per-agent, per-role policy at the connection layer before it can reach outside its scope.",
      },
      {
        n: "02",
        title: "Irreversible operations without review",
        risk: "A coding or ops agent executes a destructive action — a database delete, a schema change, a production deploy — on its own judgment.",
        verdict: "ESCALATE",
        response:
          "High-impact actions are treated as privileged intents. They require an independent approval boundary before execution.",
      },
      {
        n: "03",
        title: "Source and credential exfiltration",
        risk: "An agent is manipulated into returning proprietary source, .env contents or API keys through a routine-looking query.",
        verdict: "DENY",
        response:
          "File and credential access to .env, private keys and config stores is blocked by default policy.",
      },
    ],
  },
  {
    slug: "government",
    name: "Government & Public Sector",
    tag: "Government & Public Sector",
    headline: "DPDP compliance for departments that",
    accent: "can't afford to get it wrong.",
    body: "Government departments and PSUs hold some of the country's largest stores of citizen data — and the tightest deadline.",
    compliance: [
      "DPDP Act, 2023",
      "CERT-In 6-hour breach rule",
      "Data Protection Board filings",
      "Sectoral regulator rules",
    ],
    scenarios: [
      {
        n: "01",
        title: "Consent collected without a lawful basis",
        risk: "Citizen data is collected and reused across schemes without a clear, recorded consent artefact for each purpose.",
        verdict: "MODIFY",
        response:
          "Consent is captured per purpose, in 22 languages, with a durable record of what was agreed to and when.",
      },
      {
        n: "02",
        title: "Missed breach-notification windows",
        risk: "A breach is discovered, but CERT-In's six-hour clock and Data Protection Board filing requirements are missed.",
        verdict: "ESCALATE",
        response:
          "Breach detection triggers a pre-built filing workflow for CERT-In, the Data Protection Board and the relevant regulator.",
      },
      {
        n: "03",
        title: "Unmanaged vendor and agent access",
        risk: "Empanelled vendors, contractors and now AI agents accumulate standing access to citizen data with no periodic review.",
        verdict: "DENY",
        response:
          "Every access grant — human or agent — is inventoried and reviewable under the same accountability layer as AgentGuard.",
      },
    ],
  },
];
