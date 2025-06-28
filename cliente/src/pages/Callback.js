import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refresh_token");

    if (token) {
      localStorage.setItem("token", token);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
      navigate("/");
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
