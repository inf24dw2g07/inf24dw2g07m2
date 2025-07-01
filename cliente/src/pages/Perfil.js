import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPerfil(res.data))
      .catch((err) => {
        console.error("Erro ao buscar dados do perfil:", err);
        alert("Erro ao carregar perfil do Spotify.");
        clearToken();
        navigate("/login");
      });
  }, [navigate]);

  if (!perfil) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          color: "#fff",
        }}
      >
        <p style={{ fontSize: "20px" }}>Carregando perfil do Spotify...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#222",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Perfil do Spotify</h1>

        <p style={{ fontSize: "18px" }}>
          <strong>Nome:</strong> {perfil.display_name}
        </p>
        <p style={{ fontSize: "14px", color: "#ccc" }}>
          <strong>Email:</strong> {perfil.email}
        </p>
        <p style={{ fontSize: "14px", color: "#ccc" }}>
          <strong>País:</strong> {perfil.country}
        </p>

        {perfil.images.length > 0 && (
          <img
            src={perfil.images[0].url}
            alt="Avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: "20px",
              marginBottom: "20px",
              border: "3px solid #444",
            }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Voltar à Home
          </button>
          <button
            onClick={() => {
              clearToken();
              navigate("/login");
            }}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;