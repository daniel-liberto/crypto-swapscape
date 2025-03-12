
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, languages, Language } from "@/providers/LanguageProvider";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Find current language details
  const currentLanguage = languages.find(lang => lang.code === language);
  
  // Extract the country code from the language code (e.g., "BR" from "pt-BR")
  const countryCode = language.split('-')[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          aria-label="Change language"
          className="hover:scale-105 relative"
        >
          <span className="absolute -top-3 text-xs font-medium bg-background border border-border rounded-md px-1 py-0.5">
            {countryCode}
          </span>
          <Languages size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={`flex items-center gap-2 ${language === lang.code ? 'bg-accent' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.label}</span>
            {language === lang.code && (
              <span className="ml-auto text-xs rounded-full bg-primary/10 text-primary px-1.5 py-0.5">
                {lang.code.split('-')[1]}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
