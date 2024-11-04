import { Link, Redirect, Route } from 'react-router-dom';
import { IonApp, IonHeader, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import BuyPage from './components/BuyPage';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import MarketingScreen from './components/MarketingScreen';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* Change it to show only when user is logged in or blank*/}
      <IonHeader>

      </IonHeader>
    {/* <IonHeader>
        {"Welcome"}
        </IonHeader> */}
    {/* <IonTabBar slot="top">
          <IonTabButton tab="home" href="/home">
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="buy" href="/buy">
            <Link to="/buy">Position 2</Link>
          </IonTabButton>

          <IonTabButton tab="position3" href="/position3">
            <IonLabel>Position 3</IonLabel>
          </IonTabButton>

          <IonTabButton tab="position4" href="/position4">
            <IonLabel>Position 4</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      <IonRouterOutlet>
        <Route exact path="/home" component={Home}/>
        <Route path="/buy" component={BuyPage} />
        <Route path="/marketing" component={MarketingScreen} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    
    </IonReactRouter>
  </IonApp>
);

export default App;
