import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://api.curiousdevs.com/leads/create"; // change if needed

export function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      mobile: form.mobile.value,
      subject: form.subject.value,
      message: form.message.value,
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
        title: "Message sent",
        description: "We’ll get back to you within 24 hours.",
      });

      form.reset();
    } catch (err: any) {
      toast({
        title: "Failed",
        description: err.message,
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
              Let’s <span className="gradient-text">Connect</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10">
              Interested in CyberSentinel or future platforms?
              Send us a message and we’ll respond quickly.
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
              <Button variant="heroPrimary" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
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
                  <InputField id="name" label="Name" required />
                  <InputField id="email" label="Email" type="email" required />
                </div>

                <InputField id="mobile" label="Mobile" required />

                <InputField id="subject" label="Subject" />

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    rows={5}
                    required
                    className="bg-background border-border"
                  />
                </div>

                <Button
                  type="submit"
                  variant="heroPrimary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full gap-2"
                >
                  {isLoading ? "Sending..." : <>Send Message <Send className="w-4 h-4" /></>}
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function InfoItem({ icon: Icon, label, value }: any) {
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

function InputField({ id, label, type = "text", required = false }: any) {
  return (
    <div>
      <label className="text-sm text-muted-foreground mb-2 block">
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        className="bg-background border-border"
      />
    </div>
  );
}
