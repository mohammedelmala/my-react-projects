import { useEffect, useState } from "react";
import paginate from "./utils";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // ////////////////////////
  //   get products function
  // ////////////////////////
  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(paginate(data));
    setLoading(false);
  };
  // use effect to run when component loading
  useEffect(() => {
    getProducts();
  }, []);

  return { loading, data };
};

export default useFetch;
