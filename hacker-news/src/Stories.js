import { useGlobalContext } from "./context";
const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();
  // console.log(nbPages);
  if (isLoading) {
    return <div className="loading" />;
  }
  return (
    <section className="stories">
      {hits.map((story) => {
        const { objectID, title, num_comments, url, points, author } = story;
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by<span>{author}|</span>
              {num_comments} comments
            </p>
            <div className="">
              <a href={url} className="read-link" target="_blank">
                read more
              </a>
              <button
                className="remove-btn"
                onClick={() => removeStory(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
