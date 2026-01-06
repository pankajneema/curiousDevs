import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Shield, Brain, Link2, Cpu, Cloud, Target, Zap, Lock, Globe, BarChart3, Layers, Server, Database, Network, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CyberSentinelLogo } from "@/components/logos/CyberSentinelLogo";

const products = {
  cybersentinel: {
    name: "CyberSentinel",
    tagline: "Your Proactive Cybersecurity Command Center",
    description: "CyberSentinel is a comprehensive Attack Surface Management platform that provides continuous asset discovery, real-time risk visibility, and early threat awareness. Built for modern enterprises that demand proactive security.",
    status: "live",
    href: "https://cybersentinel.curiousdevs.com/",
    icon: Shield,
    useLogo: true,
    color: "from-live to-cyan-400",
    features: [
      { icon: Target, title: "Attack Surface Discovery", description: "Automatically discover and map all your external assets, subdomains, and exposed services." },
      { icon: Zap, title: "Real-time Threat Detection", description: "Continuous monitoring with instant alerts for new vulnerabilities and security risks." },
      { icon: Lock, title: "Risk Prioritization", description: "AI-powered risk scoring to focus on what matters most to your security posture." },
      { icon: Globe, title: "Global Visibility", description: "Complete visibility into your digital footprint across all regions and cloud providers." },
      { icon: BarChart3, title: "Security Analytics", description: "Comprehensive dashboards and reports for stakeholders and compliance needs." },
      { icon: Layers, title: "Integration Ready", description: "Seamlessly integrate with your existing security tools and workflows." },
    ],
    vision: "We envision a world where organizations have complete visibility and control over their digital attack surface. CyberSentinel aims to democratize enterprise-grade security intelligence, making proactive threat management accessible to businesses of all sizes."
  },
  "ai-ml-mcp": {
    name: "AI / ML & MCP Platform",
    tagline: "Intelligent Systems for the Context-Aware Future",
    description: "A powerful AI platform designed for building intelligent systems, Model Context Protocol (MCP) servers, and advanced context-aware automation. Enabling the next generation of AI-powered applications.",
    status: "coming",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
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
    status: "coming",
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
    status: "coming",
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
    status: "coming",
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

  const ProductIcon = product.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-light/50 via-background to-background" />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br ${product.color} opacity-10 blur-3xl rounded-full`} />
          
          <div className="section-container relative z-10">
            <Link to="/#products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                {'useLogo' in product && product.useLogo ? (
                  <CyberSentinelLogo className="w-16 h-16" />
                ) : (
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                    <ProductIcon className="w-8 h-8 text-white" />
                  </div>
                )}
                {product.status === "live" ? (
                  <span className="badge-live px-4 py-1.5">LIVE</span>
                ) : (
                  <span className="badge-coming-soon px-4 py-1.5">Coming Soon</span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-xl lg:text-2xl text-primary mb-6">{product.tagline}</p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                {product.description}
              </p>

              {product.status === "live" && 'href' in product ? (
                <a href={product.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="heroPrimary" size="lg" className="gap-2 group">
                    Open {product.name}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="heroSecondary" size="lg" disabled className="opacity-60">
                    Coming Soon
                  </Button>
                  <Link to="/#newsletter">
                    <Button variant="nav" size="lg">
                      Get Notified
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {product.status === "live" ? "Key Features" : "Planned Features"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {product.status === "live" 
                  ? "Discover what makes this platform powerful and unique."
                  : "Here's what we're building for you."}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} opacity-20 flex items-center justify-center mb-4 group-hover:opacity-40 transition-opacity`}>
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-transparent via-navy-light/30 to-transparent">
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
              
              {product.status === "live" && 'href' in product ? (
                <a href={product.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="heroPrimary" size="lg" className="gap-2 group">
                    Get Started with {product.name}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
              ) : (
                <Link to="/#contact">
                  <Button variant="heroPrimary" size="lg" className="gap-2">
                    Contact Us for Early Access
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
