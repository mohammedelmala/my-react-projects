import useFetch from "./useFetch";
import Follower from "./Follower";
import { useState, useEffect } from "react";

const App = () => {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(1);
  const [followers, setFollowers] = useState([]);
  // use effect
  useEffect(() => {
    if (!loading) {
      setFollowers(data[page]);
    }
  }, [loading, page]);
  // handle page
  const handlePage = (index) => {
    setPage(index);
    // setFollowers(data[index]);
  };
  // prev
  const prevPage = (e) => {
    setPage((page) => (page === 0 ? data.length - 1 : page - 1));
  };
  // next
  const nextPage = (e) => {
    setPage((page) => (page === data.length - 1 ? 0 : page + 1));
  };
  //  render component
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading" : "pagination"}</h1>
        <div className="underline" />
      </div>

      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              prev
            </button>
            {data.map((_, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : ""}`}
                  onClick={(e) => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
