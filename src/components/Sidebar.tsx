import { 
  Home, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  BarChart2, 
  Wallet, 
  RefreshCw,
  History, 
  User, 
  HelpCircle, 
  LogOut,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors",
        active 
          ? "bg-sidebar-accent text-primary" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
};

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-sidebar p-4 flex flex-col border-r border-border/40">
      <div className="mb-8 px-4 py-2">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/905a7c0e-2fb7-4bf6-97a2-9c5cabfc4a4c.png" 
            alt="Logo" 
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-foreground">CryptoSwap</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          active={activePage === "dashboard"} 
          onClick={() => onNavigate("dashboard")}
        />
        
        <SidebarItem 
          icon={<RefreshCw size={20} />} 
          label="Converter" 
          active={activePage === "converter"} 
          onClick={() => onNavigate("converter")}
        />
        
        <SidebarItem 
          icon={<ArrowDownToLine size={20} />} 
          label="Depositar" 
          active={activePage === "deposit"} 
          onClick={() => onNavigate("deposit")}
        />
        
        <SidebarItem 
          icon={<ArrowUpFromLine size={20} />} 
          label="Sacar" 
          active={activePage === "withdraw"} 
          onClick={() => onNavigate("withdraw")}
        />
        
        <SidebarItem 
          icon={<History size={20} />} 
          label="Movimentações" 
          active={activePage === "transactions"} 
          onClick={() => onNavigate("transactions")}
        />
        
        <SidebarItem 
          icon={<BarChart2 size={20} />} 
          label="Mercado" 
          active={activePage === "market"} 
          onClick={() => onNavigate("market")}
        />
      </div>
      
      <div className="mt-auto space-y-1">
        <SidebarItem 
          icon={<User size={20} />} 
          label="Meu Perfil" 
          active={activePage === "profile"} 
          onClick={() => onNavigate("profile")}
        />
        
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Configurações" 
          active={activePage === "settings"} 
          onClick={() => onNavigate("settings")}
        />
        
        <SidebarItem 
          icon={<HelpCircle size={20} />} 
          label="Ajuda" 
          active={activePage === "help"} 
          onClick={() => onNavigate("help")}
        />
        
        <SidebarItem 
          icon={<LogOut size={20} />} 
          label="Sair" 
          onClick={() => onNavigate("logout")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
