
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="crypto-card p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} className="text-crypto-down" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está tentando acessar não existe ou foi movida.
        </p>
        <Button className="w-full" asChild>
          <a href="/">Voltar ao Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
