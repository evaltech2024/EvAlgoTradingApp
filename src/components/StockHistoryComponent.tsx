import { useState, useEffect } from "react";
import { fetchStockHistory } from "../../api/apiCalls";
import { StockHistory } from "./objects";
import { IonCol, IonGrid, IonHeader, IonLabel, IonRow, IonToggle } from "@ionic/react";

function StockHistoryComponent() {

  const [stocksHistory, setStocksHistory] = useState<StockHistory[]>([]);

  console.log(stocksHistory)
 
  const columns = ["Symbol", "method", "strategy", "start", "end", "gain", "overall"]

  useEffect(() => {
    fetchStockHistory().then((data) => {
    const respectiveHistory = data.filter((hist) => hist.symbol === "SNTI")
      setStocksHistory(respectiveHistory)

      console.log(data)
    }).catch((err) => console.log(err))
  }, [])

  return (
    <div style={{overflow: "scroll", paddingBottom: "100px"}}>
         <IonHeader>
    
         <IonRow>
             {columns.map((col, index) => (
            <IonCol key={index}>{col}</IonCol>
          ))}
        </IonRow>
    </IonHeader>
     <IonGrid>
        {/* <IonRow>{"Stocks Info"}</IonRow>
        <IonRow>
             {columns.map((col, index) => (
            <IonCol key={index}>{col}</IonCol>
          ))}
        </IonRow> */}
        {stocksHistory.map((hist, index) => (
          <IonRow key={index}>
          <IonCol>{hist.symbol}</IonCol>
          <IonCol>{hist.method}</IonCol>
          <IonCol>{hist.strategy}</IonCol>
          <IonCol>{hist.start}</IonCol>
          <IonCol>{hist.end}</IonCol>   
          <IonCol>{hist.gain}</IonCol>
          <IonCol>{hist.overall}</IonCol>
      </IonRow>
        ))}
        </IonGrid>
    </div>
  )
}

export default StockHistoryComponent