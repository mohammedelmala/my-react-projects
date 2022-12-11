import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });

  const fetchMovie = async (url) => {
    setIsLoading(true);

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    if (data.Response === "False") {
      setError({ show: true, message: data.Error });
    } else {
      setMovie(data);
      setError({ show: false, message: "123" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading" />;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.message}</h1>
        <Link to="/" className="btn">
          back to home
        </Link>
      </div>
    );
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <article className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back to home
        </Link>
      </div>
    </article>
  );
};

export default SingleMovie;
