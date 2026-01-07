import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://api.curiousdevs.com/lead/create";

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileError, setMobileError] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: ""
  });

  const validateMobile = (mobile: string) => {
    const cleaned = mobile.replace(/\D/g, "");
    
    if (!cleaned) {
      setMobileError("Mobile number is required");
      return false;
    }
    
    if (cleaned.length < 10) {
      setMobileError("Mobile number must be at least 10 digits");
      return false;
    }
    
    if (cleaned.length > 15) {
      setMobileError("Mobile number is too long");
      return false;
    }
    
    setMobileError("");
    return true;
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, mobile: value });
    if (value) validateMobile(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateMobile(formData.mobile)) {
      return;
    }

    setIsLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      mobile: countryCode + formData.mobile.replace(/\D/g, ""),
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: ""
      });
      setMobileError("");
    } catch (err: any) {
      toast({
        title: "Failed to send message",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-navy-light/30 to-background" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10">
              Interested in CyberSentinel or future platforms?
              Send us a message and we'll respond quickly.
            </p>

            <div className="space-y-6">
              <InfoItem icon={Mail} label="Email" value="hello@curiousdevs.com" />
              <InfoItem icon={Phone} label="Phone" value="+91 8171268630" />
              <InfoItem icon={MapPin} label="Location" value="India" />
              <InfoItem icon={Clock} label="Response" value="Within 24 hours" />
            </div>

            <div className="mt-10 p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">Explore CyberSentinel</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our live cybersecurity platform for Attack Surface Management.
              </p>
              <a href="#products">
                <Button variant="heroPrimary" className="gap-2 group">
                  Get Started 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Mobile Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-32 h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <div className="flex-1">
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleMobileChange}
                        placeholder="Enter mobile number"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  {mobileError && (
                    <p className="text-sm text-red-500 mt-1">{mobileError}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter digits only (10-15 digits)
                  </p>
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm text-muted-foreground mb-2 block">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="heroPrimary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ---------- Helper Components ---------- */

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-card border flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}