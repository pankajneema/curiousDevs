import { motion } from "framer-motion";
import { Lightbulb, Shield, Telescope, Layers, Eye, Rocket, Target, Users } from "lucide-react";
import { CuriousDevsLogo } from "@/components/logos/CuriousDevsLogo";

const values = [
  { icon: Target, title: "Product-First Mindset", description: "We build platforms that solve real problems, not just projects for the sake of it." },
  { icon: Shield, title: "Security at Core", description: "Security isn't a feature—it's the foundation of everything we build." },
  { icon: Telescope, title: "Long-Term Vision", description: "We invest in technology that creates lasting impact, not quick wins." },
  { icon: Layers, title: "Scalable Architecture", description: "Every system is designed to grow with your needs, from day one." },
  { icon: Eye, title: "Radical Transparency", description: "We believe in building in public and sharing our journey openly." },
];

const stats = [
  { value: "1", label: "Live Platform" },
  { value: "4+", label: "In Development" },
  { value: "100%", label: "Security Focused" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div className="section-container relative z-10">
        {/* Main About Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CuriousDevsLogo className="w-12 h-12" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                About <span className="gradient-text">CuriousDevs</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                CuriousDevs was born from a simple conviction: <span className="text-foreground font-medium">the best technology emerges when curiosity meets disciplined engineering.</span>
              </p>
              <p>
                We're not a services company or a consulting firm. We're platform builders. Our focus is on creating deep-tech products that address fundamental challenges in cybersecurity, artificial intelligence, blockchain, IoT, and cloud infrastructure.
              </p>
              <p>
                <span className="text-foreground font-medium">CyberSentinel</span>, our flagship cybersecurity platform, represents what we stand for—production-ready technology built with security, reliability, and user experience at its core. It's just the beginning of our journey to build technology that matters.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="text-center p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Mission Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To build transformative deep-tech platforms that empower organizations with security, intelligence, and infrastructure for the digital age—designed with clarity, built for scale.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6 text-foreground">
              Why <span className="gradient-text">CuriousDevs</span>
            </h3>

            <div className="space-y-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-card border border-transparent hover:border-border transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <value.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
