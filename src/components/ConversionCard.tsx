
import { useState } from "react";
import { RefreshCw, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ConversionCardProps {
  buyRate: number;
  sellRate: number;
}

const ConversionCard = ({ buyRate, sellRate }: ConversionCardProps) => {
  const { toast } = useToast();
  const [fromCurrency, setFromCurrency] = useState<"BRL" | "USDT">("BRL");
  const [toCurrency, setToCurrency] = useState<"BRL" | "USDT">("USDT");
  const [amount, setAmount] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [isRotating, setIsRotating] = useState(false);
  
  const rate = fromCurrency === "BRL" ? (1 / buyRate) : sellRate;
  
  const handleSwapCurrencies = () => {
    setIsRotating(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setAmount(convertedAmount);
      setConvertedAmount(amount);
      setIsRotating(false);
    }, 150);
  };
  
  const handleAmountChange = (value: string) => {
    setAmount(value);
    
    if (value === "") {
      setConvertedAmount("");
      return;
    }
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const result = numericValue * rate;
      setConvertedAmount(result.toFixed(6));
    }
  };
  
  const handleConvert = () => {
    if (!amount || amount === "0") {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido para conversão",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Conversão realizada",
      description: `${amount} ${fromCurrency} convertido para ${convertedAmount} ${toCurrency}`,
    });
  };
  
  return (
    <div className="crypto-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Converter</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <RefreshCw size={14} className="mr-1" />
          <span>Taxa: {fromCurrency === "BRL" ? buyRate : sellRate} {fromCurrency === "BRL" ? "BRL/USDT" : "USDT/BRL"}</span>
        </div>
      </div>
      
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm text-muted-foreground">De</label>
            <span className="text-sm font-medium">{fromCurrency}</span>
          </div>
          <div className="relative">
            <Input 
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="crypto-input pr-20"
              placeholder="0.00"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <span className={cn(
                "font-medium",
                fromCurrency === "BRL" ? "text-crypto-brl" : "text-crypto-usdt"
              )}>
                {fromCurrency}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-6">
          <Button 
            variant="outline" 
            size="icon" 
            className={cn(
              "rounded-full transition-transform duration-300",
              isRotating && "rotate-180"
            )}
            onClick={handleSwapCurrencies}
          >
            <ArrowUpDown size={16} />
          </Button>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm text-muted-foreground">Para</label>
            <span className="text-sm font-medium">{toCurrency}</span>
          </div>
          <div className="relative">
            <Input 
              type="number"
              value={convertedAmount}
              readOnly
              className="crypto-input pr-20"
              placeholder="0.00"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <span className={cn(
                "font-medium",
                toCurrency === "BRL" ? "text-crypto-brl" : "text-crypto-usdt"
              )}>
                {toCurrency}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full mt-6"
          onClick={handleConvert}
        >
          Converter {fromCurrency} para {toCurrency}
        </Button>
      </div>
    </div>
  );
};

export default ConversionCard;
