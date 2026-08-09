from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "CuriousDevs_Company_Blueprint_v2.5_Service_Led.pdf"

INK = colors.HexColor("#0A1424")
DEEP = colors.HexColor("#132840")
SIGNAL = colors.HexColor("#1C60FA")
SLATE = colors.HexColor("#5A6572")
PAPER = colors.HexColor("#FAF8F5")
RULE = colors.HexColor("#D8DDE5")
PALE = colors.HexColor("#F0F4F9")
WHITE = colors.white


def p(text, style):
    return Paragraph(text, style)


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CoverBrand", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=14, leading=18, textColor=SIGNAL, alignment=TA_CENTER,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="CoverKicker", parent=styles["Normal"], fontName="Helvetica",
    fontSize=10, leading=14, textColor=SLATE, alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=28, leading=32, textColor=INK, alignment=TA_CENTER,
    spaceBefore=18, spaceAfter=14,
))
styles.add(ParagraphStyle(
    name="CoverLine", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=12, leading=17, textColor=INK, alignment=TA_CENTER,
    borderColor=RULE, borderWidth=0.7, borderPadding=10, backColor=PALE,
))
styles.add(ParagraphStyle(
    name="H1x", parent=styles["Heading1"], fontName="Helvetica-Bold",
    fontSize=20, leading=24, textColor=INK, spaceBefore=0, spaceAfter=10,
))
styles.add(ParagraphStyle(
    name="H2x", parent=styles["Heading2"], fontName="Helvetica-Bold",
    fontSize=13, leading=17, textColor=SIGNAL, spaceBefore=10, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Bodyx", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.3, leading=13.5, textColor=INK, spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="Smallx", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=8, leading=11, textColor=SLATE, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="Callout", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=10, leading=14, textColor=INK, borderColor=RULE, borderWidth=0.7,
    borderPadding=9, backColor=PALE, spaceBefore=3, spaceAfter=9,
))
styles.add(ParagraphStyle(
    name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=7.6, leading=9.3, textColor=WHITE,
))
styles.add(ParagraphStyle(
    name="TableCell", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.6, leading=9.5, textColor=INK,
))
styles.add(ParagraphStyle(
    name="TableCellBold", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=7.6, leading=9.5, textColor=INK,
))


def table(rows, widths, header=True, repeat_rows=1):
    converted = []
    for r, row in enumerate(rows):
        converted.append([
            p(str(value), styles["TableHead" if header and r == 0 else "TableCell"])
            for value in row
        ])
    t = Table(converted, colWidths=widths, repeatRows=repeat_rows if header else 0,
              hAlign="LEFT")
    commands = [
        ("GRID", (0, 0), (-1, -1), 0.45, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        commands.extend([
            ("BACKGROUND", (0, 0), (-1, 0), DEEP),
            ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ])
        for i in range(1, len(rows)):
            if i % 2 == 0:
                commands.append(("BACKGROUND", (0, i), (-1, i), PALE))
    t.setStyle(TableStyle(commands))
    return t


def bullets(items):
    return [p(f"&#8226;&nbsp;&nbsp;{item}", styles["Bodyx"]) for item in items]


def footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(20 * mm, 16 * mm, width - 20 * mm, 16 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawString(20 * mm, 10.5 * mm, "CuriousDevs - AI Engineering Studio")
    canvas.drawRightString(width - 20 * mm, 10.5 * mm, f"v2.5 - Page {doc.page}")
    canvas.restoreState()


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUT), pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm,
        topMargin=18 * mm, bottomMargin=23 * mm, title="CuriousDevs Company Blueprint v2.5",
        author="CuriousDevs",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="main", frames=frame, onPage=footer)])
    story = []

    story += [Spacer(1, 34 * mm), p("CURIOUSDEVS", styles["CoverBrand"]),
              p("AI ENGINEERING STUDIO", styles["CoverKicker"]),
              p("Company Blueprint &<br/>Operating Model", styles["CoverTitle"]),
              p("Version 2.5 - Service-Led Edition - August 2026", styles["CoverKicker"]),
              Spacer(1, 14 * mm),
              p("Think Deeper. Build Smarter. Turn AI Potential Into Production Power.", styles["CoverLine"]),
              Spacer(1, 13 * mm),
              p("Noida, India - India-first, global-ready", styles["CoverKicker"]),
              PageBreak()]

    story += [p("1. Strategic Decision", styles["H1x"]),
              p("CuriousDevs will operate as a service-led AI engineering studio for the next phase. We will not lead the market with three standalone products. We will build, repair, secure, evaluate, and scale AI systems for clients, while turning repeated delivery problems into reusable internal IP.", styles["Bodyx"]),
              p("The public company promise", styles["H2x"]),
              p("CuriousDevs makes AI systems work reliably in production.", styles["Callout"]),
              p("This decision improves speed to revenue, customer learning, proof generation, and capital efficiency. Future products remain possible, but only after repeated customer problems, evidence, and reusable workflows justify them.", styles["Bodyx"]),
              p("What changes", styles["H2x"]),
              table([
                  ["Previous direction", "Approved direction"],
                  ["Three future products presented as the company", "One AI engineering studio with three service lines"],
                  ["Product roadmap as the primary story", "Customer problems and measurable outcomes as the primary story"],
                  ["Public product pricing before market evidence", "No public pricing during the founding cohort"],
                  ["Broad autonomous-systems ambition", "Focused AI build, repair, and productionization work"],
              ], [82 * mm, 82 * mm]),
              p("Strategic rule", styles["H2x"]),
              p("Services generate revenue. Internal tools create leverage. Repeated client problems become IP. IP may later become products.", styles["Callout"]),
              PageBreak()]

    story += [p("2. Positioning and Category", styles["H1x"]),
              p("CuriousDevs is a boutique AI engineering studio that builds new AI capabilities and makes existing AI systems reliable, secure, measurable, and production-ready.", styles["Bodyx"]),
              p("One-sentence explanation", styles["H2x"]),
              p("We build AI for production and fix AI that is already failing.", styles["Callout"]),
              p("Who we are not", styles["H2x"]),
              bullets([
                  "Not a generic web or mobile development agency.",
                  "Not a prompt-engineering consultancy selling demos without evidence.",
                  "Not a software product company pretending unreleased products are available.",
                  "Not a staff-augmentation vendor selling hours instead of outcomes.",
              ]),
              p("Differentiation", styles["H2x"]),
              bullets([
                  "Engineering depth across GenAI, backend systems, evaluation, security, and infrastructure.",
                  "A baseline-first delivery method that requires comparable evidence before claiming improvement.",
                  "A diagnostic entry point through the CuriousDevs AI Production Score.",
                  "The ability to move from assessment to implementation without handing the problem to another vendor.",
              ]),
              p("The three service lines", styles["H2x"]),
              table([
                  ["Service line", "Client question", "Core outcomes"],
                  ["BUILD", "We want to add AI or build an AI product.", "RAG applications, agents, multi-agent workflows, AI-native features."],
                  ["FIX", "Our AI works in a demo but fails in real usage.", "Accuracy, reliability, security, evaluation, cost, and latency improvements."],
                  ["SCALE", "Our AI needs to operate as a serious production system.", "Infrastructure, observability, MLOps, deployment, governance, and handover."],
              ], [28 * mm, 57 * mm, 79 * mm]),
              PageBreak()]

    story += [p("3. Integrated Service Catalog", styles["H1x"]),
              p("The catalog is intentionally broad internally, but the market sees three clear ways to enter. Each service must have a defined scope, output, success metric, and next step.", styles["Bodyx"]),
              table([
                  ["Line", "Offers", "Typical output"],
                  ["BUILD", "RAG apps and knowledge copilots; AI agents and workflow automation; multi-agent systems; AI-native product features.", "Working capability, architecture, deployment plan, evaluation baseline, and documentation."],
                  ["FIX", "RAG reliability audit; AI security and guardrails audit; retrieval and accuracy engineering; agent reliability engineering; cost and latency optimization.", "Failure map, prioritized remediation plan, implemented fixes, and before/after evidence."],
                  ["SCALE", "Production AI infrastructure; MLOps; observability; model routing; CI/CD; cloud or private deployment; ongoing engineering.", "Production handover, runbooks, monitoring, regression checks, and operating ownership."],
              ], [25 * mm, 72 * mm, 67 * mm]),
              p("Entry offers", styles["H2x"]),
              bullets([
                  "AI Production Score assessment: a structured baseline across accuracy, retrieval, grounding, agent reliability, security, latency, cost, and observability.",
                  "RAG and AI Reliability Audit: a short diagnostic engagement for teams with an existing system.",
                  "AI Security and Guardrails Audit: adversarial testing of prompts, tools, permissions, and data flows.",
              ]),
              p("Commercial sequence", styles["H2x"]),
              p("Assessment -> Audit -> Engineering Fix -> Production Hardening -> Ongoing Optimization", styles["Callout"]),
              p("No engagement should begin with an undefined promise such as 'make the AI better'. The first deliverable is always a baseline, failure map, architecture decision, or clearly scoped working capability.", styles["Bodyx"]),
              PageBreak()]

    story += [p("3A. Detailed Service Catalog - Full Capability Map", styles["H1x"]),
              p("CuriousDevs can support the full lifecycle of an AI system. The client-facing story remains Build, Fix, and Scale; this page defines the technical depth behind each line so the team can scope a wide range of serious AI work without presenting a confusing list of disconnected services.", styles["Bodyx"]),
              table([
                  ["Capability area", "Included work", "Typical result"],
                  ["AI-native development", "AI-native products and features; copilots; conversational interfaces; domain assistants; intelligent search; research systems; support automation; AI-enabled business workflows.", "A usable AI capability designed around the workflow, user experience, data, model behavior, and production constraints."],
                  ["RAG and knowledge systems", "Document ingestion; parsing; chunking; metadata; hybrid dense and sparse retrieval; reranking; citations; knowledge graphs; pgvector, Qdrant, and vector database tuning.", "Relevant, grounded answers with an evaluation set and a clear retrieval failure map."],
                  ["Agents and orchestration", "Tool and API agents; browser automation; multi-step execution; memory and state; human-in-the-loop; planner, executor, reviewer patterns; routing; LangGraph or custom orchestration.", "Reliable workflows with explicit tool permissions, state handling, fallback behavior, and trajectory tests."],
                  ["Backend and application engineering", "Python and Golang services; APIs; event-driven workflows; queues; data pipelines; authentication; integrations; service boundaries; application logic; test suites.", "A maintainable application layer that can support the AI capability beyond a prototype."],
                  ["Audit and diagnosis", "RAG reliability audits; AI security and guardrails audits; prompt-injection testing; system-prompt leak review; MCP and tool-permission review; accuracy, latency, cost, and failure diagnosis.", "A baseline, failure map, prioritized remediation plan, and decision on what to fix first."],
                  ["Evaluation and reliability", "Evaluation harnesses; benchmark datasets; labeled test sets; edge cases; regression suites; hallucination analysis; retrieval precision and recall; agent trajectory testing; QA automation.", "Comparable before/after evidence and a repeatable way to prevent quality regressions."],
                  ["Optimization and hardening", "Model routing; semantic caching; token and payload optimization; latency profiling; cost attribution; retrieval improvements; guardrails; permission controls; data-leakage prevention; resilience and fallback design.", "A safer, faster, more economical system with documented tradeoffs and measurable improvements."],
                  ["Production infrastructure and MLOps", "Docker and Kubernetes; CI/CD; cloud deployment; private or VPC environments; observability; logs, traces, and metrics; model serving; release controls; incident runbooks; handover and training.", "A deployable, observable, supportable production system with operational ownership defined."],
              ], [34 * mm, 82 * mm, 44 * mm]),
              p("How a broad request becomes a scoped engagement", styles["H2x"]),
              p("Business problem -> system assessment -> architecture decision -> defined workstream -> baseline -> implementation -> evaluation -> deployment -> handover", styles["Callout"]),
              p("The catalog is not a promise to do everything in one project. Each engagement selects the smallest set of capabilities required to achieve the agreed outcome.", styles["Smallx"]),
              PageBreak()]

    story += [p("4. Founding Customer Model - No Public Pricing Yet", styles["H1x"]),
              p("CuriousDevs will not publish fixed prices while the founding offer is being validated. Public pricing is postponed until scope patterns, delivery cost, customer value, and conversion data are real enough to support a defensible pricing model.", styles["Bodyx"]),
              p("Founding cohort rule", styles["H2x"]),
              p("Accept up to 20 completed founding engagements per service line: up to 20 BUILD customers, 20 FIX customers, and 20 SCALE customers. The cohort is a learning and proof program, not an indefinite discount program.", styles["Callout"]),
              table([
                  ["Public website", "Sales conversation", "Internal record"],
                  ["Show the service, outcomes, process, and a Contact Us CTA.", "Qualify the problem, assess complexity, then issue a scoped proposal.", "Track effort, margin, time-to-value, objections, outcomes, and next-step conversion."],
                  ["Do not show arbitrary package prices or pretend that all systems have equal risk.", "Use a written scope with assumptions, exclusions, milestones, and acceptance criteria.", "Do not change price solely because a buyer is in India or abroad; price according to scope, risk, access, and value."],
              ], [53 * mm, 53 * mm, 58 * mm]),
              p("When to introduce public pricing", styles["H2x"]),
              bullets([
                  "At least 10 completed engagements in a service line, or enough data to identify a repeatable scope.",
                  "At least 3 usable case studies with measurable outcomes.",
                  "Known delivery cost, gross margin, cycle time, and common change-request patterns.",
                  "A repeatable qualification process that prevents under-scoped work.",
              ]),
              p("Website CTA", styles["H2x"]),
              p("Tell us what you are building - or what is going wrong with the AI you already have.", styles["Callout"]),
              PageBreak()]

    story += [p("5. Ideal Customers and Qualification", styles["H1x"]),
              p("The initial market must be narrower than the long-term market. CuriousDevs should focus on buyers who already feel the cost of unreliable AI and can make a technical decision quickly.", styles["Bodyx"]),
              table([
                  ["Priority", "Customer", "Entry point", "Why now"],
                  ["1", "AI startups", "BUILD or FIX", "AI is the product; failure directly affects growth and retention."],
                  ["2", "SaaS companies with AI features", "BUILD or SCALE", "They need reliable copilots, workflow automation, or production infrastructure."],
                  ["3", "Companies with an existing AI system", "FIX", "They have measurable accuracy, security, cost, latency, or evaluation pain."],
                  ["4", "AI and software agencies", "BUILD or FIX", "They need specialist delivery or white-label engineering capacity."],
                  ["Later", "Mid-market, enterprise, government", "SCALE", "Pursue after proof, references, security controls, and procurement readiness."],
              ], [15 * mm, 42 * mm, 28 * mm, 79 * mm]),
              p("Qualification gates", styles["H2x"]),
              bullets([
                  "There is a real AI system, a defined workflow, or a decision to build one.",
                  "A named technical owner can provide access, context, and acceptance criteria.",
                  "The problem has business impact, not only technical curiosity.",
                  "The client can provide data, environments, and decision-maker access within the agreed timeline.",
                  "The client accepts measurable baselines, scope limits, and written change requests.",
              ]),
              p("Reject or defer when", styles["H2x"]),
              bullets([
                  "The buyer wants an unlimited prototype for an undefined budget.",
                  "The client cannot provide data or a testable success criterion.",
                  "The work is generic web development unrelated to AI engineering depth.",
                  "The request creates legal, privacy, or safety risk that cannot be governed.",
              ]),
              PageBreak()]

    story += [p("6. Standard Delivery System", styles["H1x"]),
              p("Every project follows the same evidence-based operating loop. The exact technical work changes; the delivery discipline does not.", styles["Bodyx"]),
              table([
                  ["Stage", "What happens", "Output"],
                  ["01 - Qualify", "Problem, urgency, buyer, budget range, fit, data, and access are assessed.", "Qualified lead or reject."],
                  ["02 - Discover", "Users, workflows, architecture, constraints, business impact, and risks are mapped.", "Problem statement and discovery notes."],
                  ["03 - Architect and scope", "Solution, assumptions, exclusions, timeline, milestones, and acceptance criteria are written.", "Signed SOW."],
                  ["04 - Baseline", "Current quality, cost, latency, security, or delivery performance is measured.", "Baseline metrics and test set."],
                  ["05 - Build or diagnose", "New capability is implemented or root causes are isolated.", "Working system or failure map."],
                  ["06 - Engineer or fix", "Retrieval, agents, backend, security, infrastructure, or evaluation is improved.", "Improved system."],
                  ["07 - Re-test", "Comparable queries, edge cases, regression checks, and acceptance tests are run.", "Before/after evidence."],
                  ["08 - Deploy and hand over", "Deployment, documentation, runbooks, training, monitoring, and QA are completed.", "Production handover."],
                  ["09 - Expand", "The next highest-value engineering opportunity is prioritized.", "New SOW or ongoing work."],
              ], [30 * mm, 80 * mm, 54 * mm]),
              p("Golden engineering rule", styles["H2x"]),
              p("Baseline -> Diagnose/Design -> Build/Fix -> Re-test -> Document. No improvement claim without comparable evidence.", styles["Callout"]),
              p("Scope protection", styles["H2x"]),
              bullets([
                  "BUILD work uses milestone payments tied to prototype/evaluation and production/QA acceptance.",
                  "AUDIT work is paid before delivery begins unless an approved exception exists.",
                  "Every SOW defines deliverables, assumptions, exclusions, timeline, success metrics, and acceptance criteria.",
                  "Two major workflow revision cycles are included during prototyping; new workflows or major integrations require a change request.",
              ]),
              PageBreak()]

    story += [p("7. CuriousDevs AI Production Score", styles["H1x"]),
              p("The Production Score is the signature diagnostic framework. It should help a buyer understand what is broken, why it is broken, and what should be fixed first.", styles["Bodyx"]),
              table([
                  ["Dimension", "What it measures", "Evidence"],
                  ["Answer accuracy", "Correctness and usefulness of final responses.", "Labeled query set and human or rubric-based review."],
                  ["Retrieval quality", "Relevance and completeness of retrieved evidence.", "Precision, recall, ranking, and failure examples."],
                  ["Grounding", "Whether answers are supported by trusted context.", "Citation or evidence alignment checks."],
                  ["Agent reliability", "Workflow, decision, and tool-use correctness.", "Trajectory tests, edge cases, and task completion rate."],
                  ["Security", "Injection, leakage, permissions, and unsafe tool-use risk.", "Adversarial tests and access review."],
                  ["Latency", "End-to-end response and workflow performance.", "P50, P95, and critical-path breakdown."],
                  ["Cost efficiency", "Model, token, retrieval, and infrastructure cost.", "Cost per task and usage attribution."],
                  ["Observability", "Logs, traces, metrics, and regression visibility.", "Coverage of events, alerts, and reproducibility."],
              ], [35 * mm, 75 * mm, 54 * mm]),
              p("Framework rules", styles["H2x"]),
              bullets([
                  "The score is a diagnostic baseline, not a universal ranking of companies.",
                  "The test set, assumptions, date, environment, and weighting are recorded in every report.",
                  "Scores are comparable only when the evaluation method and data are comparable.",
                  "Every report ends with a prioritized remediation roadmap and a proposed next step.",
              ]),
              p("Proof required before public launch", styles["H2x"]),
              bullets([
                  "A sample anonymized report.",
                  "A published methodology page.",
                  "At least three before/after examples.",
                  "A clear explanation of limitations and human review.",
              ]),
              PageBreak()]

    story += [p("8. Proof, Content, and Sales Engine", styles["H1x"]),
              p("The company will earn trust through technical proof rather than broad marketing claims.", styles["Bodyx"]),
              table([
                  ["Asset", "Cadence or target", "Purpose"],
                  ["Case studies", "3 completed projects before aggressive hiring or enterprise pursuit.", "Show measurable before/after outcomes."],
                  ["Technical teardowns", "2 useful pieces per month.", "Demonstrate engineering judgment."],
                  ["Open-source proof", "Small tools for evals, security, cost, or reliability.", "Create developer trust and adoption."],
                  ["Sample audit", "One downloadable, anonymized report.", "Make the diagnostic offer concrete."],
                  ["Founder outreach", "50 targeted touches per week as a team, not bulk spam.", "Generate qualified conversations."],
                  ["Partner channel", "AI agencies, software agencies, and cloud consultants.", "Create specialist referrals."],
              ], [39 * mm, 62 * mm, 63 * mm]),
              p("Proof flywheel", styles["H2x"]),
              p("Project -> measurable result -> case study -> trust -> qualified lead -> project", styles["Callout"]),
              p("Claims policy", styles["H2x"]),
              bullets([
                  "Do not publish performance numbers without the environment, percentile, and measurement method.",
                  "Do not claim regulatory compliance as a substitute for legal advice.",
                  "Do not present future products as generally available products.",
                  "Do not use customer logos, data, or results without written permission.",
              ]),
              PageBreak()]

    story += [p("9. Founder Operating Model", styles["H1x"]),
              table([
                  ["Role", "Primary ownership", "Accountability"],
                  ["GenAI, DevOps, and Security Lead", "LLM architecture, infrastructure, CI/CD, prompt security, cost attribution, routing, and caching.", "Technical proof assets, security content, and production quality."],
                  ["Backend and AI Research Lead", "Python/Golang services, RAG, vector systems, agents, orchestration, and application logic.", "Discovery, architecture, technical scoping, and SOW quality."],
                  ["AI Evals and Reliability Lead", "Evaluation harnesses, datasets, edge cases, regression suites, QA, and agent trajectory testing.", "Pipeline, reporting, billing discipline, and measurable outcomes."],
              ], [42 * mm, 78 * mm, 44 * mm]),
              p("Operating rules", styles["H2x"]),
              bullets([
                  "One founder owns each client outcome; shared ownership means no ownership.",
                  "No SOW is sent without technical review and written assumptions.",
                  "No more active projects than the team can support without reducing evidence quality.",
                  "Sales commitments must be checked against delivery capacity before acceptance.",
                  "The company reviews margin, cycle time, scope changes, and customer outcome after every engagement.",
              ]),
              p("Runway and growth gates", styles["H2x"]),
              bullets([
                  "Maintain a cash reserve before increasing fixed costs.",
                  "Complete three public or permissioned case studies before hiring ahead of demand.",
                  "Do not expand the service catalog until the current line has repeatable delivery evidence.",
              ]),
              PageBreak()]

    story += [p("10. Website and Customer Experience", styles["H1x"]),
              p("The website must sell a serious engineering engagement, not an unreleased product portfolio.", styles["Bodyx"]),
              p("Hero", styles["H2x"]),
              p("Build AI for production. Fix AI that is already failing.", styles["Callout"]),
              p("We build RAG systems, agents, AI features, and production infrastructure. We also diagnose and repair accuracy, reliability, security, cost, latency, and evaluation problems in existing AI systems.", styles["Bodyx"]),
              p("Primary navigation", styles["H2x"]),
              table([
                  ["Navigation", "Purpose"],
                  ["Services", "Build, Fix, and Scale catalog."],
                  ["Production Score", "Diagnostic framework and sample assessment."],
                  ["How We Work", "Evidence-based delivery process."],
                  ["Case Studies", "Measured outcomes and proof."],
                  ["About", "Founder expertise and operating principles."],
                  ["Contact", "Qualification form and working-session request."],
              ], [45 * mm, 119 * mm]),
              p("Homepage sequence", styles["H2x"]),
              p("Hero -> Production AI problem -> Build/Fix/Scale -> Production Score -> Delivery process -> Proof -> Final contact CTA", styles["Callout"]),
              p("Public pricing policy", styles["H2x"]),
              p("Do not publish fixed prices during the founding cohort. Show 'Contact us for a scoped proposal' and explain that price depends on system complexity, data access, integrations, security requirements, deployment environment, and measurable risk.", styles["Bodyx"]),
              PageBreak()]

    story += [p("11. Twelve-Month Validation Plan", styles["H1x"]),
              table([
                  ["Phase", "Focus", "Exit criteria"],
                  ["Days 0-30", "Positioning, service pages, qualification form, sample audit, and target-account list.", "Clear website story and qualified discovery pipeline."],
                  ["Days 31-90", "Complete founding engagements and record baseline, effort, scope, outcome, and objections.", "First measurable results and repeatable delivery notes."],
                  ["Months 4-6", "Publish permissioned proof, refine offers, and identify the highest-converting entry service.", "Three strong case studies and known delivery economics."],
                  ["Months 7-9", "Standardize playbooks, templates, evaluation assets, and internal tooling.", "Higher margin and shorter cycle time without quality loss."],
                  ["Months 10-12", "Decide whether to publish pricing, hire, expand ICP, or develop a productized IP offering.", "Decision based on evidence, not ambition."],
              ], [30 * mm, 86 * mm, 48 * mm]),
              p("Metrics that matter", styles["H2x"]),
              bullets([
                  "Qualified problems converted into signed engagements.",
                  "Time from discovery to signed SOW.",
                  "Gross margin and founder hours per engagement.",
                  "Baseline-to-outcome improvement with comparable evidence.",
                  "Audit-to-engineering conversion.",
                  "Repeat work and referrals.",
                  "Scope changes, disputes, and rework.",
              ]),
              p("Do not optimize for vanity metrics such as impressions, followers, or raw inquiry count.", styles["Callout"]),
              PageBreak()]

    story += [p("12. Final Strategic North Star", styles["H1x"]),
              p("CuriousDevs should become the specialist team companies call when they want to build AI seriously or when their existing AI needs to work seriously in production.", styles["Callout"]),
              p("The next decision is not which product to launch. The next decision is which customer problems we can solve repeatedly, prove visibly, and deliver profitably.", styles["Bodyx"]),
              p("Approved principles", styles["H2x"]),
              bullets([
                  "Sell specialized outcomes, not developer hours.",
                  "Keep the external story focused on Build, Fix, and Scale.",
                  "Use audits and the Production Score as trust-building entry points.",
                  "Measure before and after every meaningful intervention.",
                  "Protect scope, data, credentials, and customer confidentiality.",
                  "Turn repeated delivery problems into internal IP before turning them into products.",
                  "Do not publish pricing until the first 20-customer learning cycle produces evidence.",
              ]),
              Spacer(1, 7 * mm),
              HRFlowable(width="100%", thickness=0.7, color=RULE),
              Spacer(1, 5 * mm),
              p("Customer-facing closing line", styles["H2x"]),
              p("Have an AI idea? Build it. Have an AI system? Improve it. Tell us what you are trying to build - or what is going wrong with the AI you already have.", styles["Callout"]),
              p("Contact CuriousDevs for a scoped conversation. Pricing is confirmed after the problem, system, risk, and success criteria are understood.", styles["Bodyx"])]

    def flatten(items):
        result = []
        for item in items:
            if isinstance(item, list):
                result.extend(flatten(item))
            else:
                result.append(item)
        return result

    doc.build(flatten(story))
    print(OUT)


if __name__ == "__main__":
    build()
