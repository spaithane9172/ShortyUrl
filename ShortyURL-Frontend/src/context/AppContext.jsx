import { createContext, useState } from "react";

export const Context = createContext();
const AppContext = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  return (
    <Context.Provider value={{ isUserLogin, setIsUserLogin }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
