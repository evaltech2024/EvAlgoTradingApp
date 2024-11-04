// addMockData.ts
import { collection, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./defineFirestore";
import { Columns } from "../src/components/objects"

export const addMockData = async () => {
  const stocksCollection = collection(db, "currentActiveTrades"); 
  
  const mockStocksTableData: Columns[] = [
    { stock: 'TSLA', price: 230, percentGain: 230, lastActivity: "activity here" },
    { stock: 'AAPL', price: 220, percentGain: 200, lastActivity: "activity here" },
    { stock: 'MSFT', price: 250, percentGain: 150, lastActivity: "activity here" },
    { stock: 'AMZN', price: 270, percentGain: 130, lastActivity: "activity here" },
    { stock: 'GOOGL', price: 300, percentGain: 100, lastActivity: "activity here" },
    { stock: 'JNJ', price: 220, percentGain: 90, lastActivity: "activity here" },
    { stock: 'NVDA', price: 100, percentGain: 80, lastActivity: "activity here" },
    { stock: 'WMT', price: 250, percentGain: 60, lastActivity: "activity here" },
    { stock: 'KO', price: 260, percentGain: 40, lastActivity: "activity here" },
    { stock: 'PFE', price: 130, percentGain: 20, lastActivity: "activity here" },
    { stock: 'NFLX', price: 280, percentGain: 10, lastActivity: "activity here" },
  ];

  try {
    for (const user of mockStocksTableData) {
      const userDocRef = doc(stocksCollection, user.stock); 
      await setDoc(userDocRef, user);
      console.log(`Added document with ID: ${user.stock}`);
    }
    console.log('All mock data added successfully');
  } catch (error) {
    console.error('Error adding mock data: ', error);
  }
};

export async function deleteAllDocuments(collectionName: string) {
  const stocksCollection = collection(db, collectionName);
  const querySnapshot = await getDocs(stocksCollection);

  querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
  });
  console.log(`All documents deleted from the ${collectionName} collection.`);
}

