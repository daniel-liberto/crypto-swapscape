
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
      className="hover:scale-105"
    >
      {theme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </Button>
  );
}
