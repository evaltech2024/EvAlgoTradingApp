import { useContext, useEffect, useState } from 'react';
import { StockHistory, TradeItem } from '../components/objects';
import { IonHeader, IonContent, IonLabel, IonToggle } from '@ionic/react';
import StockCard from '../components/StockCard';
import { AppContext } from '../AppContext';
import "./Home.css";
import { createParams, fetchTrades, options } from "../../api/apiCalls";



function Home() {
  const [stocksInfo, setStocksInfo] = useState<TradeItem[]>();
  const [stockSymbols, setStockSymbols] = useState<string[]>([]);



  useEffect(() => {
      fetchTrades().then((data) => {
      setStocksInfo(data);
  stocksInfo?.map((stock, index) => {
    if (index < 10) {
      setStockSymbols((s) => [...s, stock.symbol])
      }
  })
      });

  }, []);

  // useEffect(() => {

  //   const now = new Date();
  //     const millisecondsUntilNextMinute =
  //       (60 - now.getSeconds()) * 1000 - now.getMilliseconds();


  //       setTimeout(() => {
  //       fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams(stockSymbols)}&feed=iex`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));  

  //     const intervalId = setInterval(() => {
  //         fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams(stockSymbols)}&feed=iex`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));  
  //       }, 60 * 1000);

  //       return () => clearInterval(intervalId);
  //     }, millisecondsUntilNextMinute);

  //   // const intervalId = setInterval(() => {
  //   //   fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams([stockItem.symbol])}&feed=iex`, options)
  //   //   .then(res => res.json())
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.error(err));  
  //   // }, 1000);

  //   // return () => {
  //   //   clearInterval(intervalId);
  //   // };
    
  // },[])

  // useEffect(() => {
  // console.log(stockSymbols)
  // }, [stockSymbols])


  //       setTimeout(() => {
  //       fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams(["AAPL", "TSLA"])}&feed=iex`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));  

  //     const intervalId = setInterval(() => {
  //         fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams(["AAPL", "TSLA"])}&feed=iex`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));  
  //       }, 60000);

  //       return () => clearInterval(intervalId);
  //     }, 60000);

  //   const intervalId = setInterval(() => {
  //     fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams(["AAPL", "TSLA"])}&feed=iex`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));  
  //   }, 60000);



  const context = useContext(AppContext);
  const toggleTheme = (e: CustomEvent) => {
    e.detail.checked ? context?.changeTheme("dark"): context?.changeTheme("light")
  }

  return (
    <div className="home">
    <IonHeader className="username-display">
      {context?.user  ? 
         <IonLabel className="user-text">
          {"Welcome "}{context.user.email}
         </IonLabel>
          : null}
        <IonToggle className="mode-select" color="dark" slot='end' defaultChecked={false} onIonChange={toggleTheme}>{"Dark Mode"}</IonToggle>
    </IonHeader>

    <IonContent className="ion-padding">        
        <div className="stock-list">
      <IonLabel className="title">{"Trending"}</IonLabel>
          {stocksInfo?.map((item, index) =>{
            return (
              index < 10 ?<StockCard stockItem={item} key={index} /> : null
            )
          }
           )}
        </div>
    </IonContent>
  </div>
  );
};

export default Home;
