import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../api/defineFirestore";
import { PromotedUserDetails, UserType } from "./components/objects";
import { getUserData } from "../api/apiCalls";

interface GlobalContext {
  theme: "light" | "dark"; 
  firebaseUser: User | null;
  customUser: PromotedUserDetails;
  setCustomUser:React.Dispatch<React.SetStateAction<PromotedUserDetails>>
  // setCustomUser: (user: PromotedUserDetails) => void;
  changeTheme: (theme: "light" | "dark") => void;
}




export const AppContext = createContext<GlobalContext | null>(null);


export function AppContextProvider(props: { children: ReactNode }) {

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<User | null>(null);
  const [customUser, setCustomUser] = useState<PromotedUserDetails>({
    userType: "public",
    name: "",
    address: "",
    approvedStatus: 0,
    idNumber: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if(user && user.email) {
      setCustomUser({
        userType: "registered",
        name: user.displayName ?? "",
        address: "",
        approvedStatus: 0,
        idNumber: "",
        phone: "",
        email: user.email,
      })
    }
  }, [user])

  useEffect(() => {
    if(customUser.email !== "" && customUser.userType === "registered") {
      getUserData(customUser.email).then((data) => {
        if(data.approvedStatus === 1) {
          setCustomUser((prev) => ({
            ...prev,
            userType: "promoted"
          }))
        }
       }).catch((err) => console.log(err) )
    }
  }, [user]) 

  const { children } = props;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const changeTheme = (theme: "light" | "dark") => {
    setTheme(theme);
    switch(theme) {
      case "dark":
        document.body.className = "dark" 
        break
      case "light":
        document.body.className = "light"
        break
      default:
        document.body.className = "light"
    }
  };

  const contextValues: GlobalContext = {
    theme: theme, 
    changeTheme: changeTheme, 
    customUser: customUser, 
    setCustomUser: setCustomUser,
    firebaseUser: user
  }



  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};