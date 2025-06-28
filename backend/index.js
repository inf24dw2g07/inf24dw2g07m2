// backend/index.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI,
} = process.env;

// Rota de login Spotify (redireciona para Spotify Login)
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private user-top-read';
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(authURL);
});

// Rota de callback — Spotify redireciona para cá com o "code"
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).send('Código não recebido.');
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token } = response.data;
    console.log(' Token recebido com sucesso.');

    // Redireciona para o React com o access_token na URL
    res.redirect(`${FRONTEND_URI}/callback?token=${access_token}`);
  } catch (error) {
    console.error(' Erro ao obter token:', error.response?.data || error.message);
    res.status(500).send('Erro ao autenticar com o Spotify');
  }
});

// Rota POST para "cadastrar" o utilizador vindo do React
app.post('/register', (req, res) => {
  const { id, display_name, email } = req.body;

  // Aqui simulas o armazenamento dos dados (podes ligar a uma BD mais tarde)
  console.log(' Usuário registrado:', { id, display_name, email });

  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Iniciar o servidor backend
app.listen(5000, () => {
  console.log(' Servidor backend rodando em http://localhost:5000');
});
