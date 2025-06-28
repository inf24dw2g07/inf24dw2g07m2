import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Sucesso from "./components/Sucesso";
import Callback from "./pages/Callback";
import Usuarios from "./pages/Usuarios"; // opcional, se já tiveres

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/usuarios" element={<Usuarios />} /> {/* opcional */}
      </Routes>
    </Router>
  );
}

export default App;


