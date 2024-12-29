import { useState, useEffect } from "react";
import { fetchStockHistory } from "../../api/apiCalls";
import { StockHistory } from "./objects";
import { IonCol, IonGrid, IonHeader, IonRow } from "@ionic/react";
import "./StockHistoryComponent.css"

function StockHistoryComponent() {

  const [stocksHistory, setStocksHistory] = useState<StockHistory[]>([]);

  const columns = ["Symbol", "method", "strategy", "start", "end", "gain", "overall"]
  const stock = localStorage.getItem("stockSymbol")

  useEffect(() => {
    if(stock) {
      fetchStockHistory(stock).then((data) => {
        const respectiveHistory = data.filter((hist) => hist.symbol == stock)
          setStocksHistory(respectiveHistory)
    
          console.log(data)
        }).catch((err) => console.log(err))
    }
  }, [])

  return (
    <div style={{overflow: "scroll", scrollbarWidth: "none", paddingBottom: "1000px"}}>
      <IonHeader className="header">  
        <IonRow className="table-header">
             {columns.map((col, index) => (
            <IonCol key={index}>{col}</IonCol>
          ))}
        </IonRow>
      </IonHeader>
     <IonGrid  className="custom-table">
        {stocksHistory.map((hist, index) => (
          <IonRow key={index} className="table-row">
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