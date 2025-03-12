
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      className="transition-transform duration-300 hover:scale-105"
    >
      <span className="transition-all duration-500 ease-in-out">
        {theme === "dark" ? (
          <Sun size={18} className="transition-transform duration-300 rotate-0" />
        ) : (
          <Moon size={18} className="transition-transform duration-300 rotate-0" />
        )}
      </span>
    </Button>
  );
}
