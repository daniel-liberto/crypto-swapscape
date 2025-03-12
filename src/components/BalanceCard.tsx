
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  label: string;
  balance: number;
  currency: "BRL" | "USDT";
  change?: {
    value: number;
    percentage: number;
  };
}

const BalanceCard = ({ label, balance, currency, change }: BalanceCardProps) => {
  const isPositiveChange = change && change.value >= 0;
  const currencySymbol = currency === "BRL" ? "R$" : "$";
  
  return (
    <div className="crypto-card p-4 glow-effect">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">{label}</span>
        <div className="flex items-end">
          <span className="text-2xl font-bold">{currencySymbol} {balance.toFixed(currency === "BRL" ? 2 : 2)}</span>
        </div>
      </div>
      
      {change && (
        <div className="mt-3 flex items-center gap-1">
          <div 
            className={cn(
              "p-1 rounded",
              isPositiveChange ? "bg-crypto-up/10 text-crypto-up" : "bg-crypto-down/10 text-crypto-down"
            )}
          >
            {isPositiveChange ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          </div>
          <span 
            className={cn(
              "text-xs font-medium",
              isPositiveChange ? "text-crypto-up" : "text-crypto-down"
            )}
          >
            {currencySymbol} {Math.abs(change.value).toFixed(2)} ({Math.abs(change.percentage).toFixed(2)}%)
          </span>
          <span className="text-xs text-muted-foreground ml-1">Desde o último mês</span>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
