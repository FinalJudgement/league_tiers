import { createContext } from "react";
import { useAppState } from "../hooks/useAppState";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { appState, setAppState } = useAppState();

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};
