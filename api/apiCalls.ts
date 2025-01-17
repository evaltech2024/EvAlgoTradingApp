import { addDoc, collection, doc, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { PromotedUserDetails, SnapshotInfo, StockHistory, StockSnapshot, TradeItem } from "../src/components/objects";
import { db } from "./defineFirestore";
import { User } from "firebase/auth";

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'APCA-API-KEY-ID': 'AKHANCIT35S1XKPZCUR2',
    'APCA-API-SECRET-KEY': 'KpbWo7pOiPTNCE52CgiKd9C9aXub3Kd98LnYg8Eq'
  }
};


 export const createParams = (stocksArray: string[]) => {
  let stock = "";
  stocksArray.forEach((s) => {
    stock += "%2C" + s
  } )
  return stock;
}

export const getMockData = () => {
  return  {
    dailyBar: {
      c: 141.91,
      h: 145.18,
      l: 140.1,
      n: 39133,
      o: 144.89,
      t: "2024-11-15T05:00:00Z",
      v: 3889458,
      vw: 142.103655
    },
    latestQuote: {
      ap: 142.17,
      as: 1,
      ax: "V",
      bp: 141.81,
      bs: 1,
      bx: "V",
      c: [
        "R"
      ],
      t: "2024-11-15T20:59:58.955132555Z",
      z: "C"
    },
    latestTrade: {
      c: [
        "@",
        "T"
      ],
      i: 39133,
      p: 142.17,
      s: 300,
      t: "2024-11-15T21:50:24.480046084Z",
      x: "V",
      z: "C"
    },
    minuteBar: {
      c: 142.17,
      h: 142.17,
      l: 142.17,
      n: 2,
      o: 142.17,
      t: "2024-11-15T21:50:00Z",
      v: 600,
      vw: 142.17
    },
    prevDailyBar: {
      c: 146.83,
      h: 149,
      l: 145.6,
      n: 23744,
      o: 147.61,
      t: "2024-11-14T05:00:00Z",
      v: 2266375,
      vw: 147.313632
    }
  }
}


export const getStockData = (stocks: string[]) => {
  let data = {};
  fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams(stocks)}&feed=iex`, options)
.then(res => res.json())
.then(res => data = (res))
// .then((data) => console.log(data))
.catch(err => console.error(err));

return data;
}

export const fetchTrades = async () : Promise<TradeItem[]> => {
  const itemsCollection = collection(db, "activeTrades"); 
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TradeItem[];
  return itemsList;
};

export const fetchStockHistory = async (symbol: string) : Promise<StockHistory[]> => {
  const itemsCollection = collection(db, "stockHistory"); 
  const q = query(itemsCollection, where("symbol", "==", symbol)); 
  const querySnapshot = await getDocs(q);
  const itemsList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as StockHistory[];
  return itemsList;
};

export const updateStockHistory = async (stockHistory: StockHistory[]) => {
    const historyCollection = collection(db, "stockHistory"); 
  
    try {
      for (const history of stockHistory) {
        const historyDocRef = doc(historyCollection, history.id); 
        await setDoc(historyDocRef, history);
        console.log(`Added document with ID: ${history.id}`);
      }
    } catch (error) {
      console.error('Error adding mock data: ', error);
    }
  };


export const fetchStockSnapshot = async (symbol: string) : Promise<SnapshotInfo> => {

  const usersRef = collection(db, "stockSnapshot"); 
  const q = query(usersRef, where("symbol", "==", symbol), limit(1)); 
  const querySnapshot = await getDocs(q)
  const stockSnapshot = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0] as StockSnapshot;

  console.log(stockSnapshot.snapshot[symbol])

  return stockSnapshot.snapshot[symbol] as SnapshotInfo;
};


export const updatePromotedUserDetails = async (promotedUserDetails: PromotedUserDetails) => {
  const userCollection = collection(db, "promotedUsers"); 

  try {
    const docRef = await addDoc(userCollection, promotedUserDetails);
      console.log(`Added document with ID: ${promotedUserDetails.email}`);
  } catch (error) {
    console.error('Error adding data: ', error);
  }
}

export const getUserData = async (email: string) : Promise<PromotedUserDetails> => {

  const usersRef = collection(db, "promotedUsers"); 
  const q = query(usersRef, where("email", "==", email), limit(1)); 
  const querySnapshot = await getDocs(q)
  const userSnapshot = querySnapshot.docs.map((doc) => ({  ...doc.data() }))[0] as PromotedUserDetails;
  return userSnapshot;

};