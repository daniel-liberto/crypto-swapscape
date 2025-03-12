
import { useState } from "react";
import { ChevronDown, Download, Upload, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import TransactionDetails from "./TransactionDetails";

export interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "withdrawal" | "conversion";
  amount: number;
  currency: "BRL" | "USDT";
  status: "completed" | "pending" | "failed";
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal" | "conversion">("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);
  
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-500";
      case "pending": return "bg-yellow-500/20 text-yellow-500";
      case "failed": return "bg-red-500/20 text-red-500";
      default: return "";
    }
  };
  
  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit": return <Download size={16} className="text-crypto-up" />;
      case "withdrawal": return <Upload size={16} className="text-crypto-down" />;
      case "conversion": return <ChevronDown size={16} className="text-primary" />;
      default: return null;
    }
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };
  
  return (
    <div className="crypto-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Últimas Movimentações</h3>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-9 h-9 bg-secondary/40 border-border/40 text-sm"
              placeholder="Pesquisar..."
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter size={16} />
                <span>Filtrar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("deposit")}>
                Depósitos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("withdrawal")}>
                Saques
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("conversion")}>
                Conversões
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Data</th>
              <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Tipo</th>
              <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Valor</th>
              <th className="text-left pb-3 text-muted-foreground font-medium text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr 
                key={tx.id} 
                className="border-b border-border/10 hover:bg-secondary/40 transition-colors cursor-pointer"
                onClick={() => handleRowClick(tx)}
              >
                <td className="py-3 text-sm">{tx.date}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.type)}
                    <span className="text-sm capitalize">{tx.type}</span>
                  </div>
                </td>
                <td className="py-3 text-sm">
                  <span className={tx.type === "deposit" ? "text-crypto-up" : tx.type === "withdrawal" ? "text-crypto-down" : ""}>
                    {tx.type === "withdrawal" ? "-" : ""}
                    {tx.currency === "BRL" ? "R$" : "$"} {tx.amount.toFixed(tx.currency === "BRL" ? 2 : 2)}
                  </span>
                </td>
                <td className="py-3">
                  <span className={cn("px-2 py-1 rounded-full text-xs", getStatusColor(tx.status))}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhuma transação encontrada
        </div>
      )}

      <TransactionDetails 
        transaction={selectedTransaction}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
};

export default TransactionsList;
