import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Sucesso from "./components/Sucesso";
import Callback from "./pages/Callback";
import Usuarios from "./pages/Usuarios";
import Navbar from './components/Navbar';
import Perfil from './pages/Perfil';
import TopArtistas from './pages/TopArtistas';
import Playlists from './pages/Playlists';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/top-artistas" element={<TopArtistas />} />
        <Route path="/playlists" element={<Playlists />} />
      </Routes>
    </Router>
  );
}



export default App;


