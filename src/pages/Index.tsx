
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import LoginForm from "@/components/LoginForm";
import { useLanguage } from "@/providers/LanguageProvider";

const translations = {
  "pt-BR": {
    login: "Entrar",
    register: "Cadastrar-se"
  },
  "en-US": {
    login: "Login",
    register: "Register"
  },
  "es-ES": {
    login: "Iniciar sesión",
    register: "Registrarse"
  }
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Logo and background */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar-background justify-center items-center relative">
        <div className="absolute top-4 left-4 flex space-x-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>
        <img 
          src="/lovable-uploads/905a7c0e-2fb7-4bf6-97a2-9c5cabfc4a4c.png" 
          alt="Logo" 
          className="h-32 w-auto drop-shadow-xl"
        />
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="lg:hidden mb-8 flex justify-between w-full">
          <img 
            src="/lovable-uploads/905a7c0e-2fb7-4bf6-97a2-9c5cabfc4a4c.png" 
            alt="Logo" 
            className="h-12 w-auto"
          />
          <div className="flex space-x-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>

        <div className="w-full max-w-md bg-card border border-border/40 rounded-xl p-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-base">{t.login}</TabsTrigger>
              <TabsTrigger value="register" className="text-base">{t.register}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              {/* Register form can be added later */}
              <div className="h-[380px] flex items-center justify-center">
                <p className="text-muted-foreground">Register form coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
