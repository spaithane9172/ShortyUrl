import { createContext, useState } from "react";

export const Context = createContext();
const AppContext = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [mode, setMode] = useState(Context);
  return (
    <Context.Provider value={{ isUserLogin, setIsUserLogin, mode, setMode }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
