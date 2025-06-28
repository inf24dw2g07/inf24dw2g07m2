// src/components/Login.js

import React from "react";

function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  return (
    <div className="container">
      <h1>Bem-vindo à Spotify App</h1>
      <p>Para continuar, conecte-se com sua conta Spotify.</p>
      <button onClick={handleLogin}>Login com Spotify</button>
    </div>
  );
}

export default Login;
