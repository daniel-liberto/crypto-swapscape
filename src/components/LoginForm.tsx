
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/providers/LanguageProvider";
import { toast } from "@/hooks/use-toast";

const translations = {
  "pt-BR": {
    login: "Login",
    subtext: "Entre com suas informações para realizar o login",
    emailPlaceholder: "Digite seu email",
    passwordPlaceholder: "Digite sua senha",
    forgotPassword: "Esqueci minha senha",
    loginButton: "Fazer login",
    noAccount: "Não possui uma conta?",
    createAccount: "Criar uma conta",
    emailRequired: "Email é obrigatório",
    passwordRequired: "Senha é obrigatória",
    loginSuccess: "Login realizado com sucesso!",
  },
  "en-US": {
    login: "Login",
    subtext: "Enter your information to log in",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot my password",
    loginButton: "Log in",
    noAccount: "Don't have an account?",
    createAccount: "Create an account",
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    loginSuccess: "Login successful!",
  },
  "es-ES": {
    login: "Iniciar sesión",
    subtext: "Ingrese su información para iniciar sesión",
    emailPlaceholder: "Ingrese su correo electrónico",
    passwordPlaceholder: "Ingrese su contraseña",
    forgotPassword: "Olvidé mi contraseña",
    loginButton: "Iniciar sesión",
    noAccount: "¿No tiene una cuenta?",
    createAccount: "Crear una cuenta",
    emailRequired: "El correo electrónico es obligatorio",
    passwordRequired: "La contraseña es obligatoria",
    loginSuccess: "¡Inicio de sesión exitoso!",
  }
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        variant: "destructive",
        title: t.emailRequired,
      });
      return;
    }

    if (!password) {
      toast({
        variant: "destructive",
        title: t.passwordRequired,
      });
      return;
    }

    // Mock login - in a real app, this would make an API request
    toast({
      title: t.loginSuccess,
    });
    
    // Navigate to dashboard after successful login
    navigate("/dashboard");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">{t.login}</h2>
        <p className="text-muted-foreground mt-2">{t.subtext}</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-muted-foreground" />
          </div>
          <Input
            type="email"
            placeholder={t.emailPlaceholder}
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-muted-foreground" />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={t.passwordPlaceholder}
            className="pl-10 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeOff size={18} className="text-muted-foreground" />
            ) : (
              <Eye size={18} className="text-muted-foreground" />
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-sm text-primary hover:underline">
            {t.forgotPassword}
          </button>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          {t.loginButton}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          {t.noAccount}{" "}
          <button className="text-primary font-medium hover:underline">
            {t.createAccount}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
