import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center section-container">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-6">
          <span className="text-4xl font-bold gradient-text">404</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/">
          <Button variant="heroPrimary" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
