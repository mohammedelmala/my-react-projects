import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
};

export default App;
