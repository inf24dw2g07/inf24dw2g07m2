// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from './components/Home';
import Login from './components/Login';
import Sucesso from './components/Sucesso';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </Router>
  );
}

export default App;



