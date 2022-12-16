import { useState, useEffect } from "react";
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = (urlParams) => {
  // //////////////////////////
  // define state variables
  // //////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [data, setDate] = useState(null);
  //   //////////////////////////
  // define fetchMovies function
  // ////////////////////////////
  const fetchMovies = async (url) => {
    try {
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.response === "True") {
        setDate(data.Search || data);
        setError({ show: false, message: "" });
      } else {
        setDate(null);
        setError({ show: true, message: data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //  ///////////////////////////////
  // useEffect
  // ////////////////////////////////
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  //  ///////////////////////////////
  // return
  // ////////////////////////////////
  return { isLoading, error, data };
};

export default useFetch;

// https://www.omdbapi.com/?apikey=d391ceca&s=&type=movie&y=2022
