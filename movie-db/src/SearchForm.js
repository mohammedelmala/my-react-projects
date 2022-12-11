import { useState } from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { setQuery, error } = useGlobalContext();
  const [title, setTitle] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setQuery(title);
  };

  return (
    <form className="search-form" onSubmit={submitHandler}>
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error.show && <div className="error">{error.message}</div>}
    </form>
  );
};

export default SearchForm;
