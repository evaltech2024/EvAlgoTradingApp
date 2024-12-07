import { IonButton, IonCol, IonIcon, IonLabel, IonProgressBar, IonRow, IonTitle } from '@ionic/react';
import "./StockCard.css";
import { StockHistory, TradeItem } from './objects';
import { addIcons } from 'ionicons';
import { barChartOutline } from 'ionicons/icons';
import { fetchStockHistory, getMockData, updateStockHistory } from "../../api/apiCalls";
import { useEffect, useState } from 'react';

addIcons({
  'bar-chart-outline': barChartOutline,
});

function StockCard(props: { stockItem: TradeItem }) {

  const { stockItem } = props;
  const [stockData, setStockData] = useState(getMockData());
  const [dailyPercentChange, setDailyPercentChange] = useState<number>(0);
  const [lastDayPercentChange, setLastDayPercentChange] = useState<number>(0);
  const [evalOverall, setEvalOverall] = useState<number>(0);
  const [evalDaily, setEvalDaily] = useState<number>(0);
  const [evalDailyTrades, setEvalDailyTrades] = useState<number>(0);
  const [stocksHistory, setStocksHistory] = useState<StockHistory[]>([]);

  useEffect(() => {
    fetchStockHistory().then((data) => {
      setStocksHistory(data)
    }).catch((err) => console.log(err))
  }, [])


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]

    const respectiveHistory = stocksHistory.filter((hist) => hist.symbol === stockItem.symbol)

    respectiveHistory.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    const overallEmpty = respectiveHistory.filter((h) => h.overall === "")
    const overallNotEmpty = respectiveHistory.filter((h) => h.overall !== "")

    const todaysHistory = respectiveHistory.filter((hist) => hist.start.split(' ')[0] === today)

    if(overallEmpty.length > 0) { 
      let d = 0.0;
      if (overallNotEmpty.length > 0) {
        if(isNaN(+overallNotEmpty[overallNotEmpty.length - 1].overall)) {
          throw Error("Not a number")
        }
        d = parseFloat(overallNotEmpty[overallNotEmpty.length - 1].overall)

      }
      overallEmpty.map((r, index) => {
        r.overall = ((+r.gain + d) / parseFloat((overallNotEmpty.length + index + 1.0).toString())).toFixed(4).toString();
        d = parseFloat(r.overall);
      })      
    }

    updateStockHistory(overallEmpty);

    if (overallEmpty.length > 0) {
        setEvalOverall(parseFloat(overallEmpty[overallEmpty.length - 1].overall))
    }
    else if (overallNotEmpty.length > 0) {
      if(!isNaN(+overallNotEmpty[overallNotEmpty.length - 1].overall))  {
      setEvalOverall(parseFloat(overallNotEmpty[overallNotEmpty.length - 1].overall))
      }
      else {
        console.log(overallNotEmpty[overallNotEmpty.length - 1])
      }
    }

    // Calculating eval gain today
    if(todaysHistory.length > 0) {
      todaysHistory.forEach((r) => {
        if (!isNaN(+r.gain)) {
        setEvalDaily((e) => e + parseFloat(r.gain))
        }
      })
      setEvalDaily((e) => e / parseFloat(todaysHistory.length.toString()))
      setEvalDaily((c) => parseFloat(c.toFixed(2)))

    }

    // Calculating eval gain overall
    setEvalOverall((c) => parseFloat(c.toFixed(2)))

  }, [stocksHistory])

  


  useEffect(() => {
    setDailyPercentChange(((stockData.minuteBar.c - stockData.dailyBar.o) / stockData.dailyBar.o) * 100);
    setDailyPercentChange((c) => parseFloat(c.toFixed(2)))
    setLastDayPercentChange(((stockData.prevDailyBar.o - stockData.prevDailyBar.c) / stockData.prevDailyBar.c) * 100);
    setLastDayPercentChange((c) => parseFloat(c.toFixed(2)))

  }, [stockData])

  
  

  // useEffect(() => {

  //   const now = new Date();
  //     const millisecondsUntilNextMinute =
  //       (60 - now.getSeconds()) * 1000 - now.getMilliseconds();


  //       setTimeout(() => {
  //       fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams([stockItem.symbol])}&feed=iex`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));  

  //     const intervalId = setInterval(() => {
  //         fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams([stockItem.symbol])}&feed=iex`, options)
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

  


  return (
    <div className='stock-card'>
      <IonRow>
        <IonCol className="card-column">
          <IonProgressBar value={stockItem.strength/100} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="card-column">
          <IonTitle className="stock-name">{stockItem.symbol}</IonTitle>
          <div className='gain-div'>
            <div style={{display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between"}}>
            <IonLabel className="eval-gain-percent">
           {"EvAlGO Overall: "}{evalOverall} {"%"}
          </IonLabel>
          <IonButton size='small' routerLink='/stock-history'>
             <IonIcon  icon='bar-chart-outline' />
             </IonButton>
            </div>
          
          <IonLabel className="eval-gain-percent" style={{justifySelf: "flex-end"}}>
          <span className='eval-title'> {"Today Trades: #"}</span> {evalDailyTrades} {"Gain: "} {evalDaily}{"%"}
          </IonLabel>
          </div>      
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="card-column">
        <IonLabel className="stock-price">{stockData.minuteBar.c}</IonLabel>     
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="card-column">
        <div className='gain-div'>
          <IonLabel>
          {dailyPercentChange} {"%"}
          </IonLabel>
          <IonLabel className="eval-gain-percent">
          {"Last Day: "} {lastDayPercentChange} {"%"}
          </IonLabel>
          </div>      
             <div className="buttons-div">
              <IonButton fill="outline" routerLink='/sell' color="danger" className="sell-button" disabled={stockItem.method[0] !== "sell"}>{"SELL"}</IonButton>
             <IonButton routerLink='/buy' className="buy-button" disabled={stockItem.method[0] !== "buy"}>{"BUY"}</IonButton>
             </div>        
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol className="card-column">
          {/* <div className='gain-div'>
          <IonLabel className="eval-gain-percent">
             {"EVAL's Gain(%) Today: "} {evalDaily} {"%, Overall: "}{evalOverall} {"%"}
          </IonLabel>

          </div>       */}
           
        </IonCol>
      </IonRow>
    </div>
  )
}

export default StockCard

{/* <div className='stock-card'>
<IonRow>
  <IonCol className="card-column">
    <IonProgressBar value={stockItem.strength/100} />
  </IonCol>
</IonRow>
<IonRow>
  <IonCol className="card-column">
       <IonTitle className="stock-name">{stockItem.symbol}</IonTitle>
       <IonLabel className="stock-price">{stockData.minuteBar.c}</IonLabel>
  </IonCol>
</IonRow>
<IonRow>
  <IonCol className="card-column">
  <div className='gain-div'>
    <IonLabel className="eval-gain-percent">
    {"Daily Change:"}{dailyPercentChange} {"%,   "}
    </IonLabel>
    <IonLabel className="eval-gain-percent">
    {"Last day change: "} {lastDayPercentChange} {"%"}
    </IonLabel>
    </div>      
       <div className="buttons-div">
        <IonButton fill="outline" routerLink='/sell' color="danger" className="sell-button" disabled={stockItem.method[0] !== "sell"}>{"SELL"}</IonButton>
       <IonButton routerLink='/buy' className="buy-button" disabled={stockItem.method[0] !== "buy"}>{"BUY"}</IonButton>
       </div>        
  </IonCol>
</IonRow>

<IonRow>
  <IonCol className="card-column">
    <div className='gain-div'>
    <IonLabel className="eval-gain-percent">
       {"EVAL's Gain(%) Today: "} {evalDaily} {"%, Overall: "}{evalOverall} {"%"}
    </IonLabel>
    {/* <IonLabel className="eval-gain-percent">
       {"EVAL's Gain(%) Overall: "} {evalOverall} {"%"}
    </IonLabel> */}
//     </div>      
//        <IonButton routerLink='/stock-history'>
//        <IonIcon icon='bar-chart-outline' />
//        </IonButton>
//   </IonCol>
// </IonRow>
// </div> */}