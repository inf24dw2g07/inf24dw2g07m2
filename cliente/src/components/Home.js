// src/pages/Home.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, clearToken, renewToken } from "../utils/auth";

function Home() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verifica se há token ou renova, se necessário
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

  // Busca dados do usuário no Spotify
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

  // Envia dados para o back-end
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

  // Aguarda os dados do usuário carregarem
  if (!user) return <p className="container">Carregando dados do usuário...</p>;

  // Tela de cadastro
  return (
    <div className="container">
      <h1>Cadastro na Aplicação</h1>
      <p>Bem-vindo, {user.display_name}!</p>
      <p>Email: {user.email}</p>
      {user.images.length > 0 && (
        <img src={user.images[0].url} alt="Avatar" width={100} />
      )}
      <button onClick={registerUser}>Finalizar Cadastro</button>
      <br /><br />
      <button onClick={() => {
        clearToken();
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
}

export default Home;


