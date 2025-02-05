import { createContext, useEffect, useState } from "react";
import axiosClient from "../axios/axios-client";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [user, setUser] = useState({});

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  useEffect(() => {
    if (token) {
      axiosClient
        .get("/user")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider as default, AppContext };
