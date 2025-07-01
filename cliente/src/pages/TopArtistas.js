import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, renewToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

function TopArtistas() {
  const [artistas, setArtistas] = useState([]);
  const navigate = useNavigate();

  const salvarArtistasNoBanco = async () => {
    const artistasConvertidos = artistas.map((item) => ({
      nome: item.name,
      genero: item.genres[0] || "Desconhecido",
      imagemURL: item.images?.[0]?.url || "",
    }));

    try {
      const response = await axios.post(
        "http://localhost:5000/artistas",
        artistasConvertidos
      );
      console.log("🎉 Artistas salvos no banco:", response.data);
      alert("Artistas salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar artistas no banco:", error);
      alert("Erro ao salvar artistas no banco.");
    }
  };

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
    <div className="min-h-screen px-6 py-8 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-6 mt-4">Top 10 Artistas Mais Ouvidos</h1>

      <button
        onClick={salvarArtistasNoBanco}
        className="mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Salvar artistas no banco
      </button>

      <ul className="space-y-4">
        {artistas.map((artista) => (
          <CardItem
            key={artista.id}
            title={artista.name}
            subtitle={artista.genres?.[0]}
            image={artista.images?.[0]?.url}
          />
        ))}
      </ul>
    </div>
  );
}

export default TopArtistas;
