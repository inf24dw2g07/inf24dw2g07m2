import { useEffect, useState } from "react";
import { getArtistas } from "../services/artistasService";

function ArtistasDB() {
  const [artistas, setArtistas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porPagina = 5;

  const fetchArtistas = async () => {
    try {
      const data = await getArtistas();
      console.log("Dados recebidos do backend:", data); // Debug
      setArtistas(data);
      setPaginaAtual(1); // Reinicia para a primeira página ao atualizar
    } catch (error) {
      console.error("Erro ao buscar artistas do banco de dados:", error);
    }
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  const totalPaginas = Math.ceil(artistas.length / porPagina);
  const indiceInicial = (paginaAtual - 1) * porPagina;
  const artistasPagina = artistas.slice(indiceInicial, indiceInicial + porPagina);

  return (
    <div className="container">
      <h1>Artistas Salvos no Banco de Dados</h1>

      {/* Botão para atualizar manualmente */}
      <button
        onClick={fetchArtistas}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1DB954",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
          marginTop: "1rem",
          marginBottom: "2rem",
          fontWeight: "bold"
        }}
      >
        Atualizar Lista
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {artistasPagina.map((artista) => (
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
            {artista.imagemURL && (
              <img
                src={artista.imagemURL}
                alt={artista.nome}
                width={60}
                height={60}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            )}
            <div style={{ marginLeft: "15px" }}>
              <strong style={{ fontSize: "1.1rem" }}>{artista.nome}</strong>
              <p style={{ margin: 0 }}>{artista.genero}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Botões de paginação */}
      {artistas.length > porPagina && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
          <button
            onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button
            onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default ArtistasDB;

