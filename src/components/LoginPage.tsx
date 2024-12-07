import { IonHeader, IonToolbar, IonContent, IonLabel, IonButton, IonIcon, IonFooter, IonCheckbox, IonInput, IonItem } from '@ionic/react'

function LoginPage() {


  return (
    <>
    <IonHeader class="ion-no-border">
      <IonToolbar mode="ios">
        <IonButton slot="start">
          <IonButton color="light">
            <IonIcon slot="icon-only" name="chevron-back-outline"></IonIcon>
          </IonButton>
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
        <div className="login-register-screen">
          <IonLabel class="title">Login to your Account</IonLabel>

          <IonLabel class="lbl">Email or Phone Number</IonLabel>
          <IonItem lines="none" className="item-content">
            <IonInput type="text" placeholder="Enter Email Or Phone"></IonInput>
          </IonItem>


          <IonLabel class="lbl">Password</IonLabel>
          <IonItem lines="none" className="item-content">
            <IonInput type="password" placeholder="Enter Password"></IonInput>
          </IonItem>

          <IonItem lines="none" className="check-item-content">
            <IonLabel class="lbl">By continuing you accept our Privacy Policy</IonLabel>
            <IonCheckbox slot="start" color="light" mode="md"></IonCheckbox>
          </IonItem>

          <IonButton expand="block" fill="solid" color="secondary">
            Sign In
          </IonButton>
        </div>
      </IonContent><IonFooter>
        <IonToolbar>
          <IonLabel class="auth-footer-lbl">Not looking for an account?</IonLabel>
          <IonButton expand="block" fill="solid" color="medium">
            Sign Up
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </>
  )
}

export default LoginPage