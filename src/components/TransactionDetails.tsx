
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "./TransactionsList";
import { ExternalLink, Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionDetailsProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDetails = ({ transaction, open, onOpenChange }: TransactionDetailsProps) => {
  if (!transaction) return null;
  
  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "completed": return <Check size={16} className="text-green-500" />;
      case "pending": return <Clock size={16} className="text-yellow-500" />;
      case "failed": return <X size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "";
    }
  };

  const getTransactionTypeLabel = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit": return "Depósito";
      case "withdrawal": return "Saque";
      case "conversion": return "Conversão";
      default: return type;
    }
  };

  const getStatusLabel = (status: Transaction["status"]) => {
    switch (status) {
      case "completed": return "Creditado";
      case "pending": return "Pendente";
      case "failed": return "Falhou";
      default: return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl border border-border/30 bg-gradient-to-b from-card to-background shadow-lg">
        <div className="p-6 pb-4">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              {getTransactionTypeLabel(transaction.type)}
              <span className="text-sm text-muted-foreground font-normal">
                #{transaction.id.replace('tx-', '')}
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-2 flex items-center gap-2">
            <span className={cn("text-sm px-3 py-1 rounded-full border flex items-center gap-1.5", getStatusColor(transaction.status))}>
              {getStatusIcon(transaction.status)}
              {getStatusLabel(transaction.status)}
            </span>
            <span className="text-sm text-muted-foreground">
              {transaction.date}
            </span>
          </div>
          
          <div className="mt-6 flex justify-between items-center p-4 rounded-lg bg-secondary/40 border border-border/20">
            <div className="text-sm text-muted-foreground">Valor</div>
            <div className="text-xl font-medium">
              {transaction.currency === "BRL" ? "R$" : "$"} {transaction.amount.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4 font-medium">Detalhes da transação</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Moeda</span>
              <div className="flex items-center gap-2">
                <span className="bg-teal-500/90 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {transaction.currency === "USDT" ? "T" : "R$"}
                </span>
                <span className="font-medium">{transaction.currency}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Rede</span>
              <span className="font-medium">Polygon</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Wallet</span>
              <span className="font-medium">0x793...3f334</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Hash</span>
              <span className="flex items-center text-primary gap-1 cursor-pointer hover:underline font-medium">
                Ver Comprovante <ExternalLink size={14} />
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Data</span>
              <span className="font-medium">{transaction.date} às 15:14</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Nome do pagador</span>
              <span className="text-muted-foreground">-</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">CPF do pagador</span>
              <span className="text-muted-foreground">-</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;
