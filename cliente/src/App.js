import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.search);
    const _token = hash.get("access_token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  const getPlaylists = async () => {
    try {
      const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylists(res.data.items);
    } catch (error) {
      console.error("Erro ao buscar playlists", error);
    }
  };

  return (
    <div>
      <h1>Spotify React App</h1>
      {!token ? (
        <a href="http://localhost:5000/login">Login com Spotify</a>
      ) : (
        <>
          <button onClick={getPlaylists}>Ver minhas Playlists</button>
          <ul>
            {playlists.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

