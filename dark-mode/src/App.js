import { useState, useEffect } from "react";
import Article from "./Article";
import data from "./data";
const getStorageTheme = () => {
  let theme = localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : "dark-theme";
  return theme;
};
function App() {
  const [theme, setTheme] = useState(getStorageTheme());
  //
  const toggleTheme = (e) => {
    setTheme((theme) =>
      theme === "dark-theme" ? "light-theme" : "dark-theme"
    );
  };
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <main>
      <nav>
        <div className="nav-center">
          <h2>overreacted</h2>
          <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((item) => {
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
