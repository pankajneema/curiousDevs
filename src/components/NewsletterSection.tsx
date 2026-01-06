import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://api.curiousdevs.com/newsletter/subscribe"; // change if needed

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || data.status === "failed") {
        throw new Error(data.message || "Subscription failed");
      }

      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to CuriousDevs updates.",
      });

      setEmail("");
    } catch (err: any) {
      toast({
        title: "Subscription failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay Updated with <span className="gradient-text">CuriousDevs</span>
          </h2>

          <p className="text-muted-foreground mb-8">
            Product updates, technical insights, and our journey — delivered occasionally,
            with respect for your time.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-card border-border focus:border-primary"
            />

            <Button
              type="submit"
              variant="heroPrimary"
              size="lg"
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? "Subscribing..." : <>Subscribe <Send className="w-4 h-4" /></>}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
