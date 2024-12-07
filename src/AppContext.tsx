import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../api/defineFirestore";

interface GlobalContext {
  theme: "light" | "dark"; // add local storage
  user: User | null;
  setUser?: (user: User) => void;
  changeTheme: (theme: "light" | "dark") => void,
}

export const AppContext = createContext<GlobalContext | undefined>(undefined);


export function AppContextProvider(props: { children: ReactNode }) {

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<User | null>(null);
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


  return (
    <AppContext.Provider value={{ theme: theme, changeTheme: changeTheme, user: user }}>
      {children}
    </AppContext.Provider>
  );
};