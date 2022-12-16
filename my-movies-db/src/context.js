import { useContext, createContext, useState } from "react";
import useFetch from "./useFetch";
// //////////////////////////
// create context
// /////////////////////////
export const AppContext = createContext();
// //////////////////////////
// context provider
// /////////////////////////
export const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const { isLoading, error, data: movies } = useFetch(query);
  return (
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// //////////////////////////
// make global context
// /////////////////////////
export const useGlobalContext = () => {
  return useContext(AppContext);
};

// export default { AppContext, AppProvider };
