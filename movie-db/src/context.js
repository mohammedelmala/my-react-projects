import { createContext, useContext, useState, useEffect } from "react";
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
console.log(API_ENDPOINT);
//https://www.omdbapi.com/?i=tt3896198&apikey=d391ceca
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("sup");

  //

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError({ show: false, message: "" });
      } else {
        // setMovies([]);
        setError({ show: true, message: data.Error });
      }
      setIsLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
// export default { AppContext, AppProvider };
