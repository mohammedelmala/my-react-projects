import { useState } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  // /////////////////////////////
  // set state variables
  // /////////////////////////////
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const date = new Date();
  const years = [];
  for (let i = 1920; i <= date.getFullYear(); i++) {
    years.push(i);
  }
  years.reverse();
  const { isLoading, error, setQuery } = useGlobalContext();
  // ///////////////////////////
  // submit handler
  // ///////////////////////////
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(type);
    console.log(year);
    setQuery(`&s=${title}&type=${type}&y=${year}`);
  };

  // ///////////////////////////
  // return
  // //////////////////////////

  return (
    <form className="search-form" onSubmit={submitHandler}>
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="type"
      >
        <option value="">-- all --</option>
        <option value="movie">movie</option>
        <option value="series">series</option>
        <option value="episode">episode</option>
      </select>
      {/* year */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="year"
      >
        <option value="">-- all --</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <button type="submit" className="search-btn">
        search
      </button>
      {error.show && <div className="error">{error.message}</div>}
    </form>
  );
};

export default SearchForm;
