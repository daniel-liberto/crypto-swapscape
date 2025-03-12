
import { User, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

interface CryptoHeaderProps {
  username: string;
  usdtBuyPrice: number;
  usdtSellPrice: number;
}

const CryptoHeader = ({ username, usdtBuyPrice, usdtSellPrice }: CryptoHeaderProps) => {
  return (
    <header className="h-16 border-b border-border/40 w-full flex items-center justify-between px-6">
      <div className="text-sm font-medium">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">USDT Compra</span>
            <span className="text-crypto-up font-semibold">R$ {usdtBuyPrice.toFixed(3)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">USDT Venda</span>
            <span className="text-crypto-down font-semibold">R$ {usdtSellPrice.toFixed(3)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />
        
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">3</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary-foreground">{username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{username}</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Suporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default CryptoHeader;
