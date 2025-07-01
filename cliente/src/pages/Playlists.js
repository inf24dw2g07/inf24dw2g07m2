import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, renewToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      let token = getToken();

      if (!token) {
        token = await renewToken();
        if (!token) {
          navigate("/login");
          return;
        }
      }

      try {
        const res = await axios.get(
          "https://api.spotify.com/v1/me/playlists?limit=10",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlaylists(res.data.items);
      } catch (err) {
        console.error("Erro ao buscar playlists:", err);
        clearToken();
        navigate("/login");
      }
    };

    fetchPlaylists();
  }, [navigate]);

  return (
    <div className="min-h-screen px-6 py-8 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-6 mt-4">Minhas Playlists</h1>

      <ul className="space-y-4">
        {playlists.map((playlist) => (
          <CardItem
            key={playlist.id}
            title={playlist.name}
            subtitle={`${playlist.tracks.total} músicas`}
            image={playlist.images?.[0]?.url}
          />
        ))}
      </ul>
    </div>
  );
}

export default Playlists;

