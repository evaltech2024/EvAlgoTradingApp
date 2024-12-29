import { IonButton, IonCol, IonIcon, IonLabel, IonProgressBar, IonRow, IonTitle } from '@ionic/react';
import "./StockCard.css";
import { SnapshotInfo, StockHistory, StockSnapshot, TradeItem, userPermissions } from './objects';
import { addIcons } from 'ionicons';
import { barChartOutline } from 'ionicons/icons';
import { createParams, fetchStockHistory, fetchStockSnapshot, getMockData, getStockData, options, updateStockHistory } from "../../api/apiCalls";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';



addIcons({
  'bar-chart-outline': barChartOutline,
});

export interface MyHistory {
  stockName: string
}

function StockCard(props: { stockItem: TradeItem }) {

  const { stockItem } = props;
  const [stockData, setStockData] = useState<SnapshotInfo>({
    minuteBar: {
      c: 10,
      h: 0,
      l: 0,
      n: 0,
      o: 0,
      t: '',
      v: 0,
      vw: 0
    },
    prevDailyBar: {
      c: 0,
      h: 0,
      l: 0,
      n: 0,
      o: 0,
      t: '',
      v: 0,
      vw: 0
    },
    dailyBar: {
      c: 0,
      h: 0,
      l: 0,
      n: 0,
      o: 0,
      t: '',
      v: 0,
      vw: 0
    },
    latestQuote: {
      ap: 0,
      as: 0,
      ax: '',
      bp: 0,
      bs: 0,
      bx: '',
      c: [],
      t: '',
      z: ''
    },
    latestTrade: {
      c: [],
      i: 0,
      p: 0,
      s: 0,
      t: '',
      z: ''
    },
    id: ""
  });
  const [dailyPercentChange, setDailyPercentChange] = useState<number>(0);
  const [lastDayPercentChange, setLastDayPercentChange] = useState<number>(0);
  const [evalOverall, setEvalOverall] = useState<number>(0);
  const [evalDaily, setEvalDaily] = useState<number>(0);
  const [evalDailyTrades, setEvalDailyTrades] = useState<number>(0);
  const [stocksHistory, setStocksHistory] = useState<StockHistory[]>([]);

  useEffect(() => {
    fetchStockHistory(stockItem.symbol).then((data) => {
      setStocksHistory(data)
    }).catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetchStockSnapshot(stockItem.symbol).then((data) => {
      setStockData(data)
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


        setTimeout(() => {
      // console.log(getStockData())

      const intervalId = setInterval(() => {
      //     fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams()}&feed=iex`, options)
      // .then(res => res.json())
      // .then(res => console.log(res))
      // .catch(err => console.error(err));  
        }, 60 * 1000);

        return () => clearInterval(intervalId);
      }, 60000);

    // const intervalId = setInterval(() => {
    //   fetch(`https://data.alpaca.markets/v2/stocks/snapshots?symbols=${createParams()}&feed=iex`, options)
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));  
    // }, 1000);

    // return () => {
    //   clearInterval(intervalId);
    // };
    
  // },[])

  const handleHistory = () => {
    localStorage.setItem("stockSymbol", stockItem.symbol);
  }

  const contextValues = useContext(AppContext)

  const userType = "promoted" in userPermissions[contextValues?.customUser.userType ?? ""] 
  


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
          <IonButton size='small' routerLink='/stock-history' onClick={handleHistory}>
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
              <IonButton fill="outline" color="dark" routerLink='/sell' className="sell-button" disabled={stockItem.method !== "sell"}>{"SELL"}</IonButton>
             <IonButton routerLink={ userType ? '/buy': '/'}  className="buy-button" disabled={stockItem.method !== "buy"}>{"BUY"}</IonButton>
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