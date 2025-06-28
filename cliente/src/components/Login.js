import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl } from '../utils/auth';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/sucesso'; // ou /login se quiseres ficar aqui
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'user-read-private user-read-email';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      localStorage.setItem('token', token);//  Armazena o token
      navigate('/sucesso');
    }
  }, [navigate]);

  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
    window.location = authUrl;
  };

  return (
    <div className="login">
      <h2>Spotify React App</h2>
      <button onClick={handleLogin}>Login com Spotify</button>
    </div>
  );
}

export default Login;
