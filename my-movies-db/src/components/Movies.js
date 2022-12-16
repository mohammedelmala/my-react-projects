import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { data: movies, isLoading } = useGlobalContext;
  console.log(movies);
  return;
  {
    isLoading ? (
      <div className="loading" />
    ) : (
      <section className="movies">
        {movies.map((movie, index) => {
          const {
            imdbID: id,
            Poster: poster,
            Title: title,
            Year: year,
          } = movie;

          return (
            <Link to={`/movies/${id}`}>
              <article>
                <img src={poster === "N/A" ? url : poster} alt={title} />
              </article>
            </Link>
          );
        })}
      </section>
    );
  }
};

export default Movies;
