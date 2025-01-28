import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [token, _setToken] = useState(localStorage.getItem("token"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
