
import { createContext, useContext, useState } from "react";

export type Language = "pt-BR" | "en-US" | "es-ES";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  getLanguageLabel: (code: Language) => string;
  getLanguageFlag: (code: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");

  const getLanguageLabel = (code: Language): string => {
    return languages.find(lang => lang.code === code)?.label || "";
  };

  const getLanguageFlag = (code: Language): string => {
    return languages.find(lang => lang.code === code)?.flag || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLanguageLabel, getLanguageFlag }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
