import { IonHeader, IonToolbar, IonContent, IonLabel, IonButton, IonTitle, IonRouterLink } from "@ionic/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../api/defineFirestore";
import "./LandingPage.css"



function LandingPage() {


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  }


  return (
    <>
    <IonContent className="ion-padding">
      <div className="auth-screen">
          <IonTitle className="title">
            Start Your Stock 
            Investment Today
          </IonTitle>
        <IonButton expand="block" fill="outline" color="light" onClick={signInWithGoogle}>
         {" Continue with Google"}
        </IonButton>
        <div className="sign-up">
          <IonLabel>{"Don't have an account ?"}</IonLabel>
          <IonRouterLink routerLink="/home">{"Sign Up"}</IonRouterLink>
        </div>
      </div>
    </IonContent>
  </>
  )
}

export default LandingPage