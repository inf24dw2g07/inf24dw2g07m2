// Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Captura o token da URL
  useEffect(() => {
    const hash = new URLSearchParams(window.location.search);
    const _token = hash.get("access_token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  // Busca dados do usuário no Spotify
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Erro ao buscar usuário", err));
    }
  }, [token]);

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

  // Tela de login inicial
  if (!token) {
    return (
      <div className="container">
        <h1>Spotify React App</h1>
        <a href="http://localhost:5000/login">Login com Spotify</a>
      </div>
    );
  }

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
    </div>
  );
}

export default Home;
