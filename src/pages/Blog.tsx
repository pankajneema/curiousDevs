import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsletterSection } from "@/components/NewsletterSection";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
