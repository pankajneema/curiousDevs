import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Shield, Brain, Link2, Cpu, Cloud, Target, Zap, Lock, Globe, BarChart3, Layers, Server, Database, Network, Workflow, Search, Clock, Settings, AlertTriangle, FileCheck, CheckCircle, Eye, Bug, FileText, Swords, Play, ShieldCheck, TrendingUp, Users, BookOpen, Activity, Bell, Gauge, Boxes, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CyberSentinelLogo } from "@/components/logos/CyberSentinelLogo";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Module {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "coming";
  color: string;
  iconBg: string;
  icon: React.ElementType;
  highlights: string[];
  features: Feature[];
}

const cyberSentinelModules: Module[] = [
  {
    id: "asm",
    name: "Attack Surface Management",
    tagline: "Know Your Entire Digital Footprint",
    description: "Continuously discover, inventory, and monitor all your external and cloud-facing assets. Our AI-powered platform identifies shadow IT, misconfigured services, and forgotten subdomains before attackers find them.",
    status: "live",
    color: "from-cyan-500 to-blue-500",
    iconBg: "bg-cyan-500/20",
    icon: Shield,
    highlights: ["Reduce attack surface by 60%", "Find shadow IT in minutes", "Continuous asset inventory"],
    features: [
      { icon: Search, title: "Asset Discovery", description: "Automatic discovery of all internet-facing assets" },
      { icon: Clock, title: "Real-time Monitoring", description: "24/7 monitoring for new exposures and changes" },
      { icon: Cloud, title: "Cloud Integration", description: "Native AWS, Azure, GCP integrations" },
      { icon: Gauge, title: "Risk Scoring", description: "AI-powered risk prioritization" },
    ]
  },
  {
    id: "vs",
    name: "Vulnerability Scanning",
    tagline: "Find Vulnerabilities Before Hackers Do",
    description: "High-fidelity vulnerability scanning with contextual prioritization. Our scanner identifies CVEs, misconfigurations, and security weaknesses while providing actionable remediation guidance tailored to your environment.",
    status: "live",
    color: "from-sky-500 to-cyan-400",
    iconBg: "bg-sky-500/20",
    icon: Bug,
    highlights: ["90% faster vulnerability detection", "Reduce false positives by 75%", "Automated fix suggestions"],
    features: [
      { icon: Eye, title: "Deep Scanning", description: "Comprehensive vulnerability detection" },
      { icon: Database, title: "CVE Database", description: "Real-time CVE intelligence and updates" },
      { icon: Settings, title: "Auto Remediation", description: "One-click fixes for common issues" },
      { icon: FileText, title: "Compliance Reports", description: "Ready-made audit documentation" },
    ]
  },
  {
    id: "bas",
    name: "Breach & Attack Simulation",
    tagline: "Test Your Defenses Like Real Attackers",
    description: "Automated adversary emulation to continuously test your security controls against real-world attack techniques mapped to MITRE ATT&CK framework. Identify gaps before they become breaches.",
    status: "coming",
    color: "from-red-500 to-orange-500",
    iconBg: "bg-red-500/20",
    icon: Swords,
    highlights: ["Validate security controls 24/7", "Reduce breach risk by 80%", "Prove security ROI"],
    features: [
      { icon: Target, title: "MITRE ATT&CK", description: "Full coverage of ATT&CK techniques" },
      { icon: Play, title: "Automated Testing", description: "Continuous security validation" },
      { icon: ShieldCheck, title: "Defense Validation", description: "Test EDR, SIEM, and firewalls" },
      { icon: TrendingUp, title: "Gap Analysis", description: "Detailed security gap reports" },
    ]
  },
  {
    id: "ti",
    name: "Threat Intelligence",
    tagline: "Stay Ahead of Emerging Threats",
    description: "Aggregated threat feeds with predictive analytics and contextual enrichment. Our platform correlates indicators of compromise with your environment to deliver actionable intelligence, not noise.",
    status: "coming",
    color: "from-amber-500 to-yellow-500",
    iconBg: "bg-amber-500/20",
    icon: AlertTriangle,
    highlights: ["Early warning on targeted threats", "Reduce alert fatigue by 70%", "Contextual threat insights"],
    features: [
      { icon: Boxes, title: "Threat Feeds", description: "Premium and OSINT feed aggregation" },
      { icon: Database, title: "IOC Management", description: "Automated indicator lifecycle" },
      { icon: Eye, title: "Dark Web Monitoring", description: "Leaked credentials and data alerts" },
      { icon: Activity, title: "Predictive Analytics", description: "AI-powered threat forecasting" },
    ]
  },
  {
    id: "ir",
    name: "Incident Response",
    tagline: "Respond Faster, Contain Better",
    description: "Orchestrated response workflows with automated playbooks and comprehensive case management. Reduce mean time to respond and contain incidents with guided investigation and automated actions.",
    status: "coming",
    color: "from-green-500 to-emerald-500",
    iconBg: "bg-green-500/20",
    icon: Zap,
    highlights: ["80% faster incident response", "Consistent response procedures", "Complete audit trails"],
    features: [
      { icon: Workflow, title: "Playbook Automation", description: "Customizable response workflows" },
      { icon: FileSearch, title: "Case Management", description: "Complete incident lifecycle tracking" },
      { icon: Search, title: "Forensics Tools", description: "Built-in investigation capabilities" },
      { icon: Users, title: "Team Collaboration", description: "Real-time team coordination" },
    ]
  },
  {
    id: "ca",
    name: "Compliance & Audit",
    tagline: "Automate Your Compliance Journey",
    description: "Continuous compliance monitoring for SOC2, GDPR, HIPAA, ISO 27001, PCI-DSS, and more frameworks. Automate evidence collection, track control status, and generate audit-ready reports.",
    status: "coming",
    color: "from-indigo-500 to-violet-500",
    iconBg: "bg-indigo-500/20",
    icon: FileCheck,
    highlights: ["50% less audit prep time", "Real-time compliance status", "Automated evidence collection"],
    features: [
      { icon: BookOpen, title: "Multi-Framework", description: "Support for 15+ compliance frameworks" },
      { icon: CheckCircle, title: "Auto Evidence", description: "Automated evidence collection" },
      { icon: TrendingUp, title: "Gap Analysis", description: "Real-time compliance gap detection" },
      { icon: FileText, title: "Audit Reports", description: "One-click audit documentation" },
    ]
  },
];

const integrations = [
  { name: "AWS", icon: Cloud },
  { name: "Azure", icon: Cloud },
  { name: "GCP", icon: Cloud },
  { name: "CrowdStrike", icon: Shield },
  { name: "Splunk", icon: BarChart3 },
  { name: "Jira", icon: Layers },
];

const products = {
  cybersentinel: {
    name: "CyberSentinel",
    tagline: "Your Proactive Cybersecurity Command Center",
    description: "CyberSentinel is a comprehensive Attack Surface Management platform that provides continuous asset discovery, real-time risk visibility, and early threat awareness. Built for modern enterprises that demand proactive security.",
    status: "live" as const,
    href: "https://cybersentinel.curiousdevs.com/",
    icon: Shield,
    useLogo: true,
    color: "from-live to-cyan-400",
    vision: "We envision a world where organizations have complete visibility and control over their digital attack surface. CyberSentinel aims to democratize enterprise-grade security intelligence, making proactive threat management accessible to businesses of all sizes."
  },
  "ai-ml-mcp": {
    name: "AI / ML & MCP Platform",
    tagline: "Intelligent Systems for the Context-Aware Future",
    description: "A powerful AI platform designed for building intelligent systems, Model Context Protocol (MCP) servers, and advanced context-aware automation. Enabling the next generation of AI-powered applications.",
    status: "coming" as const,
    icon: Brain,
    color: "from-sky-500 to-cyan-400",
    features: [
      { icon: Brain, title: "Advanced ML Models", description: "Pre-trained and fine-tunable models for various use cases from NLP to computer vision." },
      { icon: Workflow, title: "MCP Server Infrastructure", description: "Build and deploy Model Context Protocol servers for context-aware AI interactions." },
      { icon: Zap, title: "Real-time Inference", description: "Low-latency inference APIs designed for production workloads at scale." },
      { icon: Database, title: "Vector Storage", description: "Built-in vector database for semantic search and RAG applications." },
      { icon: Network, title: "Agent Framework", description: "Build autonomous AI agents with memory, reasoning, and tool-use capabilities." },
      { icon: Layers, title: "Multi-modal Support", description: "Process text, images, audio, and video in unified workflows." },
    ],
    vision: "We believe AI should be accessible, contextual, and seamlessly integrated into every workflow. Our platform will empower developers to build intelligent applications that understand context, learn continuously, and deliver personalized experiences at scale."
  },
  blockchain: {
    name: "Blockchain Integration Platform",
    tagline: "Secure, Decentralized Infrastructure for Enterprise",
    description: "A comprehensive blockchain integration platform providing secure identity management, data integrity verification, and seamless integration with decentralized systems for enterprise applications.",
    status: "coming" as const,
    icon: Link2,
    color: "from-amber-500 to-orange-500",
    features: [
      { icon: Lock, title: "Decentralized Identity", description: "Self-sovereign identity solutions with verifiable credentials and DID management." },
      { icon: Shield, title: "Data Integrity", description: "Immutable audit trails and cryptographic proof for critical data verification." },
      { icon: Network, title: "Smart Contracts", description: "Deploy and manage smart contracts across multiple blockchain networks." },
      { icon: Globe, title: "Multi-chain Support", description: "Unified APIs for Ethereum, Polygon, Solana, and enterprise blockchains." },
      { icon: Zap, title: "Token Management", description: "Create, manage, and integrate tokens for various business use cases." },
      { icon: Layers, title: "Enterprise Bridge", description: "Connect traditional systems with blockchain networks securely." },
    ],
    vision: "We see blockchain as the foundation for trust in the digital age. Our platform will bridge the gap between traditional enterprise systems and decentralized networks, enabling organizations to leverage blockchain's transparency and security without complexity."
  },
  iot: {
    name: "IoT Device Management Hub",
    tagline: "Unified Control for the Connected World",
    description: "A centralized platform to manage, monitor, and secure IoT devices at scale. From device provisioning to real-time analytics, manage your entire IoT fleet from a single dashboard.",
    status: "coming" as const,
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    features: [
      { icon: Cpu, title: "Device Registry", description: "Centralized registry for all IoT devices with automatic discovery and onboarding." },
      { icon: Shield, title: "Security First", description: "End-to-end encryption, secure boot, and automatic security patching." },
      { icon: BarChart3, title: "Real-time Telemetry", description: "Collect, process, and visualize device data in real-time at any scale." },
      { icon: Zap, title: "Edge Computing", description: "Deploy and manage edge workloads for low-latency processing." },
      { icon: Workflow, title: "OTA Updates", description: "Seamless over-the-air firmware updates with rollback capabilities." },
      { icon: Target, title: "Predictive Maintenance", description: "AI-powered anomaly detection and predictive maintenance alerts." },
    ],
    vision: "The future is connected, with billions of devices generating valuable insights. Our IoT Hub will provide the infrastructure to securely manage this connected ecosystem, turning raw device data into actionable intelligence for smarter operations."
  },
  cloud: {
    name: "Cloud Infrastructure Platform",
    tagline: "Modern Cloud-Native Infrastructure, Simplified",
    description: "Cloud-native infrastructure platform for DevOps automation, scalable microservice architectures, and modern application deployment. Built for teams that move fast and scale faster.",
    status: "coming" as const,
    icon: Cloud,
    color: "from-blue-500 to-indigo-500",
    features: [
      { icon: Server, title: "Container Orchestration", description: "Kubernetes-native deployment with automatic scaling and self-healing." },
      { icon: Workflow, title: "CI/CD Pipelines", description: "Built-in continuous integration and deployment with GitOps workflows." },
      { icon: Database, title: "Managed Databases", description: "Fully managed database services with automatic backups and scaling." },
      { icon: Network, title: "Service Mesh", description: "Built-in service mesh for microservices communication and observability." },
      { icon: Shield, title: "Security & Compliance", description: "Infrastructure-as-code security scanning and compliance automation." },
      { icon: BarChart3, title: "Cost Optimization", description: "AI-powered resource optimization and cost management tools." },
    ],
    vision: "We envision cloud infrastructure that's powerful yet simple, secure yet flexible. Our platform will abstract away complexity while giving teams full control, enabling rapid innovation without sacrificing reliability or security."
  }
};

function ModuleCard({ module, index }: { module: Module; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-md">
            {/* Badge & Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${module.iconBg} flex items-center justify-center`}>
                <module.icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{module.id.toUpperCase()}</span>
              {module.status === "live" ? (
                <span className="badge-live text-[10px]">Available</span>
              ) : (
                <span className="badge-coming-soon text-[10px]">Coming Soon</span>
              )}
            </div>
            
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
              {module.name}
            </h3>
            <p className="text-primary text-sm font-medium mb-3">{module.tagline}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {module.description}
            </p>
            
            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {module.highlights.map((highlight) => (
                <span key={highlight} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-live" />
                  {highlight}
                </span>
              ))}
            </div>

          </div>

          {/* Right - Features Grid */}
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Key Features</p>
            <div className="grid grid-cols-2 gap-3">
              {module.features.map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.02 }}
                  className="group p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CyberSentinelPage({ product }: { product: typeof products.cybersentinel }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/50 via-background to-background" />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br ${product.color} opacity-10 blur-3xl rounded-full`} />
        
        <div className="section-container relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <CyberSentinelLogo className="w-16 h-16" />
              <span className="badge-live px-4 py-1.5">LIVE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-lg lg:text-xl text-primary mb-5">{product.tagline}</p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {product.description}
            </p>

            <a href={product.href} target="_blank" rel="noopener noreferrer">
              <Button variant="heroPrimary" size="lg" className="gap-2 group">
                Open {product.name}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 lg:py-24">
        <div className="section-container space-y-8">
          {cyberSentinelModules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-transparent via-navy-light/20 to-transparent">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
              Integrates With Your Stack
            </h2>
            <p className="text-muted-foreground">Connect with 500+ tools and platforms you already use</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 min-w-[100px]"
              >
                <integration.icon className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-foreground">{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 lg:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
              Our Vision
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-9">
              {product.vision}
            </p>
            
            <a href={product.href} target="_blank" rel="noopener noreferrer">
              <Button variant="heroPrimary" size="lg" className="gap-2 group">
                Get Started with {product.name}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function GenericProductPage({ product }: { product: typeof products["ai-ml-mcp"] }) {
  const ProductIcon = product.icon;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/50 via-background to-background" />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br ${product.color} opacity-10 blur-3xl rounded-full`} />
        
        <div className="section-container relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                <ProductIcon className="w-8 h-8 text-white" />
              </div>
              <span className="badge-coming-soon px-4 py-1.5">Coming Soon</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-xl lg:text-2xl text-primary mb-6">{product.tagline}</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <Button variant="heroSecondary" size="lg" disabled className="opacity-60">
                Coming Soon
              </Button>
              <Link to="/contact">
                <Button variant="nav" size="lg">
                  Get Notified
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Same style as CyberSentinel */}
      <section className="py-20 lg:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Planned Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's what we're building for you.
            </p>
          </motion.div>

          {/* Features in card layout similar to CyberSentinel modules */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-6 lg:p-8">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-6">Key Features</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features?.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.color} opacity-20 flex items-center justify-center mb-3 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300`}>
                      <feature.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-transparent via-navy-light/30 to-transparent">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Our Vision
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              {product.vision}
            </p>
            
            <Link to="/contact">
              <Button variant="heroPrimary" size="lg" className="gap-2">
                Contact Us for Early Access
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products[productId as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/">
            <Button variant="heroPrimary">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {productId === "cybersentinel" ? (
          <CyberSentinelPage product={product as typeof products.cybersentinel} />
        ) : (
          <GenericProductPage product={product as typeof products["ai-ml-mcp"]} />
        )}
      </main>

      <Footer />
    </div>
  );
}
