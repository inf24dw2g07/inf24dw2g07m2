const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // permite ler JSON do corpo da requisição

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI,
} = process.env;

// Rota de login Spotify
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private user-top-read';
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(authURL);
});

// Callback do Spotify após login
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
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
    res.redirect(`${FRONTEND_URI}/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error(error);
    res.send('Erro ao autenticar com o Spotify');
  }
});

// Rota de "cadastro" que salva dados recebidos do React
app.post('/register', (req, res) => {
  const { id, display_name, email } = req.body;

  // Aqui apenas simulamos o armazenamento — podes ligar a uma BD depois
  console.log('Usuário registrado:', { id, display_name, email });

  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

app.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000');
});
