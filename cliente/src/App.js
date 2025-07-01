import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sucesso from "./components/Sucesso";
import Callback from "./pages/Callback";
import Perfil from "./pages/Perfil";
import Playlists from "./pages/Playlists";
import TopArtistas from "./pages/TopArtistas";
import Usuarios from "./pages/Usuarios";
import ArtistasDB from "./pages/ArtistasDB";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/topartistas" element={<TopArtistas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/artistasdb" element={<ArtistasDB />} />
      </Routes>
    </Router>
  );
}

export default App;


