import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, clearToken, renewToken } from "../utils/auth";

function Home() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkToken() {
      let storedToken = getToken();

      if (!storedToken) {
        storedToken = await renewToken();
      }

      if (!storedToken) {
        navigate("/login");
      } else {
        setToken(storedToken);
      }
    }

    checkToken();
  }, [navigate]);

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Erro ao buscar usuário", err);
          clearToken();
          navigate("/login");
        });
    }
  }, [token, navigate]);

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        id: user.id,
        display_name: user.display_name,
        email: user.email,
      });
      navigate("/sucesso");
    } catch (error) {
      console.error("Erro ao registrar usuário", error);
      alert("Erro ao registrar usuário");
    }
  };

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111",
        color: "#fff"
      }}>
        <p style={{ fontSize: "20px" }}>Carregando dados do usuário...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#111",
      color: "#fff",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "#222",
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Cadastro na Aplicação</h1>
        <p style={{ fontSize: "18px" }}>
          Bem-vindo, <strong>{user.display_name}</strong>!
        </p>
        <p style={{ fontSize: "14px", color: "#ccc" }}>{user.email}</p>

        {user.images.length > 0 && (
          <img
            src={user.images[0].url}
            alt="Avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: "20px",
              marginBottom: "20px",
              border: "3px solid #444"
            }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={registerUser}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Finalizar Cadastro
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
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;




