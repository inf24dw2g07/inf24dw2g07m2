import React from 'react';

function Login() {
  const handleLogin = () => {
    // Redireciona para o backend, que cuida do login com o Spotify
    window.location.href = 'http://localhost:5000/login';
  };

  return (
    <div className="login">
      <h2>Spotify React App</h2>
      <button onClick={handleLogin}>Login com Spotify</button>
    </div>
  );
}

export default Login;

