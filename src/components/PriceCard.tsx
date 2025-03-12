
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceCardProps {
  label: string;
  price: number;
  currency: "BRL";
  type: "buy" | "sell";
}

const PriceCard = ({ label, price, currency, type }: PriceCardProps) => {
  const isBuy = type === "buy";
  const currencySymbol = currency === "BRL" ? "R$" : "$";
  
  return (
    <div className="crypto-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">{label}</span>
        <div 
          className={cn(
            "p-1 rounded",
            isBuy ? "bg-crypto-up/10 text-crypto-up" : "bg-crypto-down/10 text-crypto-down"
          )}
        >
          {isBuy ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </div>
      </div>
      
      <div className="mt-2">
        <span 
          className={cn(
            "text-2xl font-bold",
            isBuy ? "text-crypto-up" : "text-crypto-down"
          )}
        >
          {currencySymbol} {price.toFixed(3)}
        </span>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <span>Atualizado há 5 segundos</span>
      </div>
    </div>
  );
};

export default PriceCard;
