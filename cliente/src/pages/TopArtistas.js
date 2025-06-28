import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, renewToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function TopArtistas() {
  const [artistas, setArtistas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopArtistas = async () => {
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
          "https://api.spotify.com/v1/me/top/artists?limit=10",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtistas(res.data.items);
      } catch (err) {
        console.error("Erro ao buscar top artistas:", err);
        clearToken();
        navigate("/login");
      }
    };

    fetchTopArtistas();
  }, [navigate]);

  return (
    <div className="container">
      <h1> Top 10 Artistas Mais Ouvidos</h1>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {artistas.map((artista) => (
          <li
            key={artista.id}
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
            {artista.images[0] && (
              <img
                src={artista.images[0].url}
                alt={artista.name}
                width={60}
                height={60}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            )}
            <span style={{ marginLeft: "15px", fontSize: "1.1rem" }}>
              {artista.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopArtistas;
