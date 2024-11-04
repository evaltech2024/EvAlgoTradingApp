import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, provider } from "../../firestore/defineFirestore";
import { IonButton } from "@ionic/react";

function MarketingScreen() {
  const [user, setUser] = useState<User | null>();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  function signInWithGoogle() {
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
    <div>
      {user ? "buy" :
      <div>
       <h1>{"Please subscribe to perform an activity"}</h1> 
       <IonButton onClick={() => signInWithGoogle()}>{"Sign in with google"}</IonButton>
        </div>
     }
    </div>
    
    
  )
}

export default MarketingScreen