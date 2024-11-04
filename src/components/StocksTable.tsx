import { IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent, IonButton } from '@ionic/react';
import { auth, db } from '../../firestore/defineFirestore';
import { addMockData } from '../../firestore/generateRandomData';
import './StocksTable.css';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Columns } from './objects';


const columns =["Stock", "Price", "% Gain", "Current Activity", "Last activity"];

const fetchData = async () => {
  const itemsCollection = collection(db, "currentActiveTrades"); 
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data() as Columns,
  }));
  return itemsList as Columns[];
};



function StocksTable(){

  const [user, setUser] = useState<User | null>();
  const [stocksInfo, setStocksInfo] = useState<Columns[]>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   addMockData();
  // }, []);
  
  useEffect(() => {
    // if (user) {
      fetchData().then((data) => {
      setStocksInfo(data);
  console.log(data)
      });
    // }
  }, []);


  return (
      <IonContent className="ion-padding center-table">
        <IonGrid>
        <IonRow>{"Stocks Info"}</IonRow>
        <IonRow>
             {columns.map((col, index) => (
            <IonCol key={index}>{col}</IonCol>
          ))}
        </IonRow>
        {stocksInfo?.map((stockInfo, index) => (
          <IonRow key={index}>
              <IonCol>{stockInfo.stock}</IonCol>
              <IonCol>{stockInfo.price}</IonCol>
              <IonCol>{stockInfo.percentGain}</IonCol>
              <IonCol>
                <IonButton color={"red"}>
                <a href="/marketing">Buy</a>
                </IonButton>
             
                {/* <IonButton>{"Sell"}</IonButton> */}
              </IonCol>
              <IonCol><a href="/buy">last activity</a></IonCol>
          </IonRow>
        ))}
          {/* <IonInfiniteScroll
        onIonInfinite={(ev) => {
          if (user) {
            fetchData().then((data) => {
            setStocksInfo(data);
            });
          }
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent className='new-scroll'>
        {stocksInfo?.map((stockInfo, index) => (
          <IonRow>
              <IonCol key={index} size="12" size-sm="3">{stockInfo.stock}</IonCol>
              <IonCol key={index} size="12" size-sm="3">{stockInfo.price}</IonCol>
              <IonCol key={index} size="12" size-sm="3">{stockInfo.percentGain}</IonCol>
              <IonCol key={index} size="12" size-sm="3">{stockInfo.lastActivity}</IonCol>
          </IonRow>
        ))}
        </IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
        
       
        </IonGrid>
      </IonContent>
  );
};

export default StocksTable;
