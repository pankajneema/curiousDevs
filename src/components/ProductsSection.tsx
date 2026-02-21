import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Link2, Cpu, Cloud, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberSentinelLogo } from "@/components/logos/CyberSentinelLogo";

const products = [
  {
    id: "cybersentinel",
    name: "CyberSentinel",
    description: "A proactive cybersecurity platform focused on Attack Surface Management, continuous asset discovery, risk visibility, and early threat awareness.",
    useLogo: true,
    status: "live",
    featured: true,
    cta: "Open CyberSentinel",
    href: "https://cybersentinel.curiousdevs.com/",
    detailHref: "/products/cybersentinel",
  },
  {
    id: "ai-ml-mcp",
    name: "AI / ML & MCP Platform",
    description: "An AI platform for intelligent systems, Model Context Protocol (MCP) servers, and advanced context-aware automation.",
    icon: Brain,
    status: "coming",
    featured: false,
    detailHref: "/products/ai-ml-mcp",
  },
  {
    id: "blockchain",
    name: "Blockchain Integration Platform",
    description: "Secure blockchain integration for identity, data integrity, and decentralized systems.",
    icon: Link2,
    status: "coming",
    featured: false,
    detailHref: "/products/blockchain",
  },
  {
    id: "iot",
    name: "IoT Device Management Hub",
    description: "A centralized platform to manage, monitor, and secure IoT devices at scale.",
    icon: Cpu,
    status: "coming",
    featured: false,
    detailHref: "/products/iot",
  },
  {
    id: "cloud",
    name: "Cloud Infrastructure Platform",
    description: "Cloud-native infrastructure, DevOps automation, and scalable microservice platforms.",
    icon: Cloud,
    status: "coming",
    featured: false,
    detailHref: "/products/cloud",
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="py-20 lg:py-24 relative section-line">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/30 to-background" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Our <span className="gradient-text">Platforms</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Deep-tech platforms built with security, scalability, and long-term impact in mind.
          </p>
        </motion.div>

        {/* Featured Product - CyberSentinel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden card-glow">
            <div className="relative p-8 lg:p-10 bg-card">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center p-3">
                    <CyberSentinelLogo className="w-full h-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground">CyberSentinel</h3>
                    <span className="badge-live">
                      <Sparkles className="w-3 h-3" />
                      LIVE
                    </span>
                  </div>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    A proactive cybersecurity platform focused on Attack Surface Management, 
                    continuous asset discovery, risk visibility, and early threat awareness.
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
                  <a href="https://cybersentinel.curiousdevs.com/" target="_blank" rel="noopener noreferrer">
                    <Button variant="heroPrimary" size="lg" className="gap-2 group">
                      Open CyberSentinel
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </a>
                  <Link to="/products/cybersentinel">
                    <Button variant="heroSecondary" size="lg" className="gap-2 group">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.filter(p => !p.featured).map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Link 
                to={product.detailHref}
                className="group relative rounded-xl overflow-hidden block h-full"
              >
                <div className="relative p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    {product.icon && <product.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <span className="badge-coming-soon mb-3 inline-flex w-fit">Coming Soon</span>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
