// Carrega todas as variáveis de ambiente (Spotify + DB)
const dotenv = require('dotenv');
dotenv.config({ path: './environment/.env' }); // Spotify
dotenv.config({ path: './environment/db.env', override: true }); // DB (sobrescreve se necessário)

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const db = require('./models');
const artistasRoutes = require('./routes/artistasRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz para teste básico
app.get('/', (req, res) => {
  console.log('Recebido GET /');
  res.send('API funcionando!');
});

// Rotas REST personalizadas
app.use('/artistas', artistasRoutes);

// Variáveis de ambiente do Spotify
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI,
} = process.env;

// Rota de login com Spotify
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private user-top-read';
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(authURL);
});

// Callback da autenticação Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).send('Código não recebido.');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token } = response.data;
    console.log('✔ Token recebido com sucesso.');

    res.redirect(`${FRONTEND_URI}/callback?token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Erro ao obter token:', error.response?.data || error.message);
    res.status(500).send('Erro ao autenticar com o Spotify');
  }
});

// Endpoint simulado de registo de utilizador
app.post('/register', (req, res) => {
  const { id, display_name, email } = req.body;
  console.log('Usuário registrado:', { id, display_name, email });
  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Endpoint simulado de listagem de usuários
app.get('/usuarios', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado: token ausente ou inválido.' });
  }

  const usuarios = [
    { id: '1', nome: 'Tiago.db_', email: 'tiagor.debrito@gmail.com' },
    { id: '2', nome: 'Joana', email: 'joana@email.com' },
    { id: '3', nome: 'Carlos', email: 'carlos@exemplo.com' },
  ];

  return res.json(usuarios);
});

// Refresh do token de acesso
app.get('/refresh_token', async (req, res) => {
  const refresh_token = req.query.refresh_token;
  if (!refresh_token) return res.status(400).json({ error: 'Refresh token não fornecido' });

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const { access_token } = response.data;
    res.json({ access_token });
  } catch (error) {
    console.error("Erro ao renovar token:", error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao renovar token' });
  }
});

// Inicia o servidor apenas depois de sincronizar a base de dados
db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Servidor backend rodando em http://localhost:5000');
  });
});

