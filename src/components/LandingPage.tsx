import { IonContent, IonLabel, IonButton, IonTitle, IonRouterLink } from "@ionic/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../api/defineFirestore";
import "./LandingPage.css"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { PromotedUserDetails } from "./objects";
import { getUserData, updatePromotedUserDetails } from "../../api/apiCalls";



function LandingPage() {

  const contextVal = useContext(AppContext)
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const customUser = result.user;
        console.log("customUser signed in:", customUser);
        contextVal?.setCustomUser((prev) => ({
          ...prev,
          userType: "registered"
        }))
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  }

  const [promotedUser, setPromotedUser] = useState<PromotedUserDetails>(contextVal?.customUser ?? {} as PromotedUserDetails)
  

  const handleInputChange = (fieldName: keyof PromotedUserDetails, value: string) => {
    setPromotedUser((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = () => {
    if(promotedUser.email !== "" && promotedUser.name !== "") {
    updatePromotedUserDetails(promotedUser)     
    }
  }


  return (
    <>
    <IonContent className="ion-padding">
      <div className="auth-screen">
          {/* <IonTitle className="title">
            Start Your Stock 
            Investment Today
          </IonTitle> */}
       
        <div className="sign-up">
          <IonLabel>{"Register to have US $100.00 in your account for trading live stocks?"}</IonLabel>
          {!contextVal?.firebaseUser ?
          <IonButton expand="block" fill="outline" color="light" onClick={() => signInWithGoogle()}>
         {" Continue with Google"}
        </IonButton>: null}

        {contextVal?.firebaseUser ?
        <>
         <IonLabel>{"Fill the below details and upload ID such as a Driver's License to start"}</IonLabel>
                <div>
                <IonLabel>{"Name (First, Last)"}</IonLabel>
                <input type="text" defaultValue={contextVal?.customUser?.name ?? ""} className="input" onChange={(e) => handleInputChange("name", e.target.value)}/>
                </div>
                <div>
                <IonLabel>{"Address"}</IonLabel>
                <input type="text" className="input" onChange={(e) => handleInputChange("address", e.target.value)}  />
                </div><div>
                <IonLabel>{"ID#"}</IonLabel>
                <input type="text" className="input" onChange={(e) => handleInputChange("idNumber", e.target.value)} />
                </div>
                <div>
                <IonLabel>{"Email"}</IonLabel>
                <input type="text" defaultValue={contextVal?.customUser.email ?? ""} className="input" onChange={(e) => handleInputChange("email", e.target.value)} />
                </div><div>
                <IonLabel>{"Phone Number"}</IonLabel>
                <input type="text" defaultValue={contextVal?.customUser?.phone ?? ""} className="input" onChange={(e) => handleInputChange("phone", e.target.value)}  />
                </div>     
                <IonButton onClick={handleSubmit}>{"Submit"}</IonButton>  
        <IonLabel>{"We are in the process of verifying... Please check back to view your status"}</IonLabel>

        </> 
               
        : null}
      


          {/* <IonRouterLink routerLink="/home">{"Sign Up"}</IonRouterLink> */}
        </div>
      </div>
      {/* <IonButton routerLink="/home">{"Submit"}</IonButton> */}
    </IonContent>
  </>
  )
}

export default LandingPage