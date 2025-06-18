// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Sucesso from "./Sucesso";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </Router>
  );
}

export default App;


