import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, renewToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

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
    <div className="container">
      <h1> Minhas Playlists</h1>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            style={{
              backgroundColor: "#2a2a2a",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            {playlist.images[0] && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                width={60}
                height={60}
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            )}
            <span style={{ marginLeft: "15px", fontSize: "1.1rem" }}>
              {playlist.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlists;

