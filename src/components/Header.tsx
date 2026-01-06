import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, Brain, Link2, Cpu, Cloud, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CuriousDevsLogo } from "@/components/logos/CuriousDevsLogo";
import { CyberSentinelLogo } from "@/components/logos/CyberSentinelLogo";

const products = [
  { name: "CyberSentinel", icon: Shield, useLogo: true, status: "live", href: "/products/cybersentinel", description: "Cybersecurity Platform" },
  { name: "AI / ML & MCP", icon: Brain, status: "coming", href: "/products/ai-ml-mcp", description: "Intelligent Systems" },
  { name: "Blockchain Platform", icon: Link2, status: "coming", href: "/products/blockchain", description: "Secure Integration" },
  { name: "IoT Platform", icon: Cpu, status: "coming", href: "/products/iot", description: "Device Management" },
  { name: "Cloud Platform", icon: Cloud, status: "coming", href: "/products/cloud", description: "Infrastructure" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Blog / Updates", href: "/#newsletter" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <CuriousDevsLogo className="w-9 h-9" />
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              CuriousDevs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/">
              <Button variant="nav" size="sm">Home</Button>
            </Link>

            {/* Products Dropdown */}
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <Button variant="nav" size="sm" className="flex items-center gap-1">
                Our Products
                <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </Button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="p-2">
                      {products.map((product) => (
                        <Link
                          key={product.name}
                          to={product.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${product.status === "live" ? "bg-live/10" : "bg-muted"}`}>
                            {product.useLogo ? (
                              <CyberSentinelLogo className="w-6 h-6" />
                            ) : (
                              <product.icon className={`w-5 h-5 ${product.status === "live" ? "text-live" : "text-muted-foreground"}`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {product.name}
                              </span>
                              {product.status === "live" ? (
                                <span className="badge-live text-[10px] px-1.5 py-0.5">LIVE</span>
                              ) : (
                                <span className="badge-coming-soon text-[10px] px-1.5 py-0.5">Soon</span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{product.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link key={link.name} to={link.href}>
                <Button variant="nav" size="sm">{link.name}</Button>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://cybersentinel.curiousdevs.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="heroPrimary" size="default" className="gap-2">
                <CyberSentinelLogo className="w-5 h-5" />
                Explore CyberSentinel
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border/50"
            >
              <nav className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="px-4 py-2">
                  <span className="text-sm text-muted-foreground">Products</span>
                  <div className="mt-2 space-y-1">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        to={product.href}
                        className="flex items-center gap-2 py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {product.useLogo ? (
                          <CyberSentinelLogo className="w-4 h-4" />
                        ) : (
                          <product.icon className="w-4 h-4" />
                        )}
                        {product.name}
                        {product.status === "live" && <span className="badge-live text-[10px]">LIVE</span>}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="px-4 pt-4">
                  <a href="https://cybersentinel.curiousdevs.com/" target="_blank" rel="noopener noreferrer">
                    <Button variant="heroPrimary" className="w-full gap-2">
                      <CyberSentinelLogo className="w-5 h-5" />
                      Explore CyberSentinel
                    </Button>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
