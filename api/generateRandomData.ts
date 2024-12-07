// addMockData.ts
import { collection, setDoc, doc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./defineFirestore";
import { StockHistory, TradeItem, TrendingStock } from "../src/components/objects"

// export const addMockData = async () => {
//   const stocksCollection = collection(db, "currentActiveTrades"); 
  
//   const mockStocksTableData: TrendingStock[] = [
//     {
//       stockSymbol: 'TSLA', currentPrice: 230, dailypercentGain: 230, tradeActivity: "BUY", stockName: "Tesla", id: "1",
//       currentEvalGain: 10,
//       overallEvalGain: 2
//     },
//     {
//       stockSymbol: 'AAPL', currentPrice: 220, dailypercentGain: 200, tradeActivity: "SELL", stockName: "Apple", id: "1",
//       currentEvalGain: 15,
//       overallEvalGain: 1
//     },
//     {
//       stockSymbol: 'MSFT', currentPrice: 250, dailypercentGain: 150, tradeActivity: "SELL", stockName: "Microsoft", id: "1",
//       currentEvalGain: 1,
//       overallEvalGain: -1
//     },
//     {
//       stockSymbol: 'AMZN', currentPrice: 270, dailypercentGain: 130, tradeActivity: "SELL", stockName: "Amazon", id: "1",
//       currentEvalGain: 20,
//       overallEvalGain: 1
//     },
//     {
//       stockSymbol: 'GOOGL', currentPrice: 300, dailypercentGain: 100, tradeActivity: "SELL", stockName: "Google", id: "1",
//       currentEvalGain: 15,
//       overallEvalGain: 4
//     },
//     {
//       stockSymbol: 'JNJ', currentPrice: 220, dailypercentGain: 90, tradeActivity: "SELL", stockName: "Johnson", id: "1",
//       currentEvalGain: 16,
//       overallEvalGain: 2
//     },
//     {
//       stockSymbol: 'NVDA', currentPrice: 100, dailypercentGain: 80, tradeActivity: "SELL", stockName: "Nvidia", id: "1",
//       currentEvalGain: 18,
//       overallEvalGain: 10
//     },
//     {
//       stockSymbol: 'WMT', currentPrice: 250, dailypercentGain: 60, tradeActivity: "SELL", stockName: "Walmart", id: "1",
//       currentEvalGain: 10,
//       overallEvalGain: 3
//     },
//     {
//       stockSymbol: 'KO', currentPrice: 260, dailypercentGain: 40, tradeActivity: "SELL", stockName: "Coca-Cola", id: "1",
//       currentEvalGain: 9,
//       overallEvalGain: 10
//     },
//     {
//       stockSymbol: 'PFE', currentPrice: 130, dailypercentGain: 20, tradeActivity: "SELL", stockName: "Pfizer", id: "1",
//       currentEvalGain: 1,
//       overallEvalGain: 0.5
//     },
//     {
//       stockSymbol: 'NFLX', currentPrice: 280, dailypercentGain: 10, tradeActivity: "SELL", stockName: "Netflix", id: "1",
//       currentEvalGain: 0.5,
//       overallEvalGain: -10
//     },
//   ];

//   try {
//     for (const user of mockStocksTableData) {
//       const userDocRef = doc(stocksCollection, user.stockSymbol); 
//       await setDoc(userDocRef, user);
//       console.log(`Added document with ID: ${user.stockSymbol}`);
//     }
//     console.log('All mock data added successfully');
//   } catch (error) {
//     console.error('Error adding mock data: ', error);
//   }
// };

export async function deleteAllDocuments() {
  const stocksCollection = collection(db, "currentActiveTrades");
  const querySnapshot = await getDocs(stocksCollection);

  querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
  });
  console.log(`All documents deleted from the collection.`);
}






