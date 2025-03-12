
import { useState } from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChartData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: ChartData[];
  currencyPair: string;
}

const PriceChart = ({ data, currencyPair }: PriceChartProps) => {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "1y">("24h");
  
  // Calculate price change
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercentage = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;
  const isPriceUp = priceChange >= 0;
  
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(3)}`;
  };
  
  return (
    <div className="crypto-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{currencyPair}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold">{formatCurrency(lastPrice)}</span>
            <span 
              className={cn(
                "text-sm",
                isPriceUp ? "text-crypto-up" : "text-crypto-down"
              )}
            >
              {isPriceUp ? "+" : ""}{priceChange.toFixed(3)} ({isPriceUp ? "+" : ""}{priceChangePercentage.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant={timeframe === "24h" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeframe("24h")}
          >
            24h
          </Button>
          <Button 
            variant={timeframe === "7d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeframe("7d")}
          >
            7d
          </Button>
          <Button 
            variant={timeframe === "30d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeframe("30d")}
          >
            30d
          </Button>
          <Button 
            variant={timeframe === "1y" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeframe("1y")}
          >
            1y
          </Button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPriceUp ? "#00C853" : "#FF3D71"} stopOpacity={0.8} />
                <stop offset="95%" stopColor={isPriceUp ? "#00C853" : "#FF3D71"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#8A98AC" }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#8A98AC" }}
              orientation="right"
              tickFormatter={formatCurrency}
              dx={10}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), "Preço"]}
              contentStyle={{ 
                backgroundColor: "rgba(26, 32, 44, 0.8)", 
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#8A98AC" }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPriceUp ? "#00C853" : "#FF3D71"} 
              fillOpacity={0.3}
              fill="url(#colorPrice)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
