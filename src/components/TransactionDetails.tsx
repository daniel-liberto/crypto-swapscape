
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "./TransactionsList";
import { ExternalLink } from "lucide-react";

interface TransactionDetailsProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDetails = ({ transaction, open, onOpenChange }: TransactionDetailsProps) => {
  if (!transaction) return null;
  
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed": return "text-crypto-up";
      case "pending": return "text-yellow-500";
      case "failed": return "text-crypto-down";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-0 text-left max-w-lg p-0 overflow-hidden">
        <div className="bg-[#0C1016] p-5 border-b border-border/20">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-between text-lg">
              <div>Detalhes do {getTransactionTypeLabel(transaction.type).toLowerCase()} <span className="text-[#888888] text-sm ml-2">#{transaction.id.replace('tx-', '')}</span></div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-[#8E9196]">STATUS</span>
              <span className={`font-medium ${getStatusColor(transaction.status)}`}>
                {transaction.status === "completed" ? "Creditado" : 
                 transaction.status === "pending" ? "Pendente" : "Falhou"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#171B24]">
          <h3 className="text-white mb-4 font-medium">Detalhes técnicos</h3>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-primary">Moeda:</span>
              <div className="flex items-center gap-2">
                <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">T</span>
                <span>{transaction.currency}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">Rede:</span>
              <span>Polygon</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">Wallet:</span>
              <span>0x793...3f334</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">Valor recebido:</span>
              <span className="text-white">$ {transaction.amount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">Hash:</span>
              <span className="flex items-center text-white gap-1 cursor-pointer hover:underline">
                Ver Comprovante <ExternalLink size={14} />
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">Data do depósito:</span>
              <span>{transaction.date} às 15:14</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">Nome do pagador:</span>
              <span>-</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-primary">CPF do pagador:</span>
              <span>-</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;
