import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { CuriousDevsLogo } from "@/components/logos/CuriousDevsLogo";

const productLinks = [
  { name: "CyberSentinel", href: "/products/cybersentinel" },
  { name: "AI / ML Platform", href: "/products/ai-ml-mcp" },
  { name: "Blockchain Platform", href: "/products/blockchain" },
  { name: "IoT Hub", href: "/products/iot" },
  { name: "Cloud Platform", href: "/products/cloud" },
];

const companyLinks = [
  { name: "About", href: "#about" },
  { name: "Blog", href: "#newsletter" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-card/50 to-background">
      {/* Main Footer */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <CuriousDevsLogo className="w-10 h-10" />
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                CuriousDevs
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Building secure, intelligent platforms for the future. Deep-tech solutions designed for long-term impact.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@curiousdevs.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                hello@curiousdevs.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                India
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    {link.name === "CyberSentinel" && (
                      <span className="text-[10px] text-live font-medium">LIVE</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get product updates and insights delivered to your inbox.
            </p>
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
            >
              Subscribe to Newsletter
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="section-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CuriousDevs. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
