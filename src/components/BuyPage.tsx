import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react'

const columns =["Day", "Buy Time", "Sell Time", "% gain", "overall % gain"];

function BuyPage() {
  return (
    <IonContent className="ion-padding center-table">
        <IonGrid>
        <IonRow>{"Buy Page"}</IonRow>
        <IonRow>
             {columns.map((col, index) => (
            <IonCol key={index} >{col}</IonCol>
          ))}
        </IonRow>
        {/* {stocksInfo?.map((stockInfo, index) => ( */}
          <IonRow>
              <IonCol>{"12/20/24"}</IonCol>
              <IonCol>{"12/20/24"}</IonCol>
              <IonCol>{"12/20/24"}</IonCol>
              <IonCol>{120}</IonCol>
              <IonCol>{120}</IonCol>
          </IonRow>
        {/* ))} */}
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
  )
}

export default BuyPage