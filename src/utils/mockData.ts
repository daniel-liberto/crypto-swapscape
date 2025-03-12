
// Mock data for crypto dashboard

// Generate price data for chart
export const generatePriceData = (
  days: number, 
  startPrice: number, 
  volatility: number = 0.02
) => {
  const data = [];
  let currentPrice = startPrice;
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i - 1));
    
    // Random price movement with trend
    const randomChange = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice = Math.max(0.01, currentPrice + randomChange);
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      price: parseFloat(currentPrice.toFixed(3))
    });
  }
  
  return data;
};

// Generate balance history data for chart
export const generateBalanceHistory = (
  days: number, 
  startBalanceBRL: number,
  startBalanceUSDT: number,
  volatility: number = 0.03
) => {
  const data = [];
  let currentBRL = startBalanceBRL;
  let currentUSDT = startBalanceUSDT;
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i - 1));
    
    // Random balance movements
    const brlChange = (Math.random() - 0.45) * volatility * currentBRL;
    const usdtChange = (Math.random() - 0.45) * volatility * currentUSDT;
    
    currentBRL = Math.max(0.01, currentBRL + brlChange);
    currentUSDT = Math.max(0.01, currentUSDT + usdtChange);
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      brl: parseFloat(currentBRL.toFixed(2)),
      usdt: parseFloat(currentUSDT.toFixed(2))
    });
  }
  
  return data;
};

// Generate mock transactions
export const generateTransactions = (count: number = 10) => {
  const types: ("deposit" | "withdrawal" | "conversion")[] = ["deposit", "withdrawal", "conversion"];
  const statuses: ("completed" | "pending" | "failed")[] = ["completed", "pending", "failed"];
  const currencies: ("BRL" | "USDT")[] = ["BRL", "USDT"];
  
  const transactions = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const type = types[Math.floor(Math.random() * types.length)];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    let amount = parseFloat((Math.random() * 1000).toFixed(currency === "BRL" ? 2 : 6));
    
    if (currency === "USDT") {
      amount = parseFloat((Math.random() * 100).toFixed(2));
    }
    
    transactions.push({
      id: `tx-${i}`,
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      type,
      amount,
      currency,
      status: i < count - 2 ? "completed" : statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });
};

// Mock exchange rates
export const exchangeRates = {
  USDT_BRL: {
    buy: 5.895,
    sell: 5.755
  }
};

// Mock balances
export const userBalances = {
  BRL: 1.20,
  USDT: 16.00
};
