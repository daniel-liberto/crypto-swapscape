
import { useState } from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Legend,
  CartesianGrid
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BalanceData {
  date: string;
  brl: number;
  usdt: number;
}

interface PriceChartProps {
  data: BalanceData[];
  title?: string;
}

const PriceChart = ({ data, title = "Histórico de Saldo" }: PriceChartProps) => {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "1y">("30d");
  
  // Format currency values
  const formatBRL = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };
  
  const formatUSDT = (value: number) => {
    return `$ ${value.toFixed(2)}`;
  };
  
  return (
    <div className="crypto-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
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
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBRL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6724" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6724" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUSDT" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#26A17B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#26A17B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
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
              yAxisId="brl"
              tickFormatter={formatBRL}
              dx={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#8A98AC" }}
              orientation="left"
              yAxisId="usdt"
              tickFormatter={formatUSDT}
              dx={-10}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === "brl") return [`R$ ${value.toFixed(2)}`, "Saldo BRL"];
                if (name === "usdt") return [`$ ${value.toFixed(2)}`, "Saldo USDT"];
                return [value, name];
              }}
              contentStyle={{ 
                backgroundColor: "rgba(26, 32, 44, 0.8)", 
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#8A98AC" }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => {
                if (value === "brl") return "Saldo BRL";
                if (value === "usdt") return "Saldo USDT";
                return value;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="brl" 
              stroke="#FF6724" 
              fillOpacity={0.3}
              fill="url(#colorBRL)" 
              strokeWidth={2}
              yAxisId="brl"
              name="brl"
            />
            <Area 
              type="monotone" 
              dataKey="usdt" 
              stroke="#26A17B" 
              fillOpacity={0.3}
              fill="url(#colorUSDT)" 
              strokeWidth={2}
              yAxisId="usdt"
              name="usdt"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
