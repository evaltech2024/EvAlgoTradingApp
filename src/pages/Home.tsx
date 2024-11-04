import { IonContent, IonHeader, IonLabel, IonMenu, IonPage, IonRouterLink, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import StocksTable from '../components/StocksTable';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
      <IonPage>
      <StocksTable/>
    </IonPage>    
  );
};

export default Home;
