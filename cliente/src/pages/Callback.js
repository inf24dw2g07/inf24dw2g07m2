import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Armazena o token
      navigate("/"); // Redireciona para a página inicial
    } else {
      console.log(" Token não recebido.");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1>Autenticando com Spotify...</h1>
    </div>
  );
}

export default Callback;

