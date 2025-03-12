
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CryptoHeader from "@/components/CryptoHeader";
import BalanceCard from "@/components/BalanceCard";
import PriceCard from "@/components/PriceCard";
import ConversionCard from "@/components/ConversionCard";
import TransactionsList from "@/components/TransactionsList";
import PriceChart from "@/components/PriceChart";
import { 
  generateBalanceHistory, 
  generateTransactions, 
  exchangeRates, 
  userBalances 
} from "@/utils/mockData";

const Dashboard = () => {
  // State for active page in sidebar
  const [activePage, setActivePage] = useState("dashboard");
  
  // Generate mock data
  const balanceHistory = generateBalanceHistory(30, userBalances.BRL, userBalances.USDT, 0.03);
  const transactions = generateTransactions(8);
  
  // Mock balance changes
  const brlChange = { value: 0.20, percentage: 0.20 };
  const usdtChange = { value: 0.50, percentage: 3.23 };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <CryptoHeader 
          username="Gustavo" 
          usdtBuyPrice={exchangeRates.USDT_BRL.buy} 
          usdtSellPrice={exchangeRates.USDT_BRL.sell} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <BalanceCard 
                label="Saldo BRL" 
                balance={userBalances.BRL} 
                currency="BRL" 
                change={brlChange} 
              />
              <BalanceCard 
                label="Saldo USDT" 
                balance={userBalances.USDT} 
                currency="USDT" 
                change={usdtChange} 
              />
              <PriceCard 
                label="USDT Compra" 
                price={exchangeRates.USDT_BRL.buy} 
                currency="BRL" 
                type="buy" 
              />
              <PriceCard 
                label="USDT Venda" 
                price={exchangeRates.USDT_BRL.sell} 
                currency="BRL" 
                type="sell" 
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <PriceChart 
                  data={balanceHistory} 
                  title="Histórico de Saldo"
                />
              </div>
              <div>
                <ConversionCard 
                  buyRate={exchangeRates.USDT_BRL.buy} 
                  sellRate={exchangeRates.USDT_BRL.sell} 
                />
              </div>
            </div>
            
            <div>
              <TransactionsList transactions={transactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
