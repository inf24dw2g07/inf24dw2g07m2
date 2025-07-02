# inf24dw2g07m2

Aplicação Web Cliente de Spotify (React + Node.js + MySQL)

Projeto acadêmico que consiste no desenvolvimento de uma aplicação fullstack com frontend em React.js e backend em Node.js + Express, utilizando autenticação OAuth 2.0 do Spotify e integração com banco de dados MySQL. Todo o ambiente é dockerizado para facilitar o desenvolvimento e deploy.


---

## Pré- Requisitos
- Node.js v18+
- Conta Spotify Developer
- Docker e Docker Compose
- Navegador moderno (Chrome, Firefox etc.)
- Conta Spotify para testes OAuth2

---

## Estrutura de Pastas

```
INF24DW2G07M2/
├── backend/              # API RESTful com Node.js
│   ├── config/
│   ├── environment/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── index.js
│   └── seedArtistas.js   # Popular o banco de dados
├── cliente/              # Aplicação React
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
└── README.md
```

---

## Configurações de Variaveis de Ambiente

### `backend/.env`

```
CLIENT_ID=d9615679be5f4c0d97b0cf399efecce4 
CLIENT_SECRET=b7f1d1abf70c49468c7aebdea5cb25a8
REDIRECT_URI=http://localhost:5000/callback
FRONTEND_URI=http://localhost:3000

DB_HOST=mysql-db
DB_USER=root
DB_PASSWORD=123456
DB_NAME=spotifydb
DB_PORT=3306
DB_DIALECT=mysql
```

### `cliente/.env`

REACT_APP_SPOTIFY_CLIENT_ID=d9615679be5f4c0d97b0cf399efecce4
" CLIENT_SECRET=b7f1d1abf70c49468c7aebdea5cb25a8 "
REACT_APP_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/callback
" FRONTEND_URI=http://localhost:3000 "

**Importante**: Não inclua aspas nem espaços extras nos valores.

---

## Como Executar o Projeto

### 1. Na pasta Backend 

```bash
cd backend
npm install
docker-compose up --build

"Esse comando irá:
Construir as imagens Docker do backend e frontend.
Subir os containers MySQL, API backend e frontend React.
Criar e inicializar o banco de dados
"
```
## Acesso a Aplicação
Frontend: http://localhost:3000
Backend API: http://localhost:5000
O servidor será iniciado em: [http://localhost:5000](http://localhost:5000)

## 2. Script para adicionar dados na Base de Dados
```bash
docker-compose exec spotify-api node seedArtistas.js
```

### 3. Frontend-Cliente (alternativo ao uso via Docker)

```bash
cd cliente
npm install
npm start
```
A aplicação será aberta em: [http://localhost:3000](http://localhost:3000)
---

## Como Funciona o Login com Spotify

1. Clica no botão “Login com Spotify”.
2. És redirecionado para a página de autenticação do Spotify (OAuth).
3. Após autorizar, és redirecionado de volta à aplicação com o token.
4. O frontend usa o `access_token` para acessar a API do Spotify e buscar dados do utilizador.

---

## Funcionalidades Implementadas

- Login com Spotify  
- Registro do usuário no backend  
- Visualização de:
        Top artistas  
        Playlists  
        Perfil do Usuário
- Renovação automática de access_token (via `refresh_token`)  
- Interface personalizada com CSS tradicional

---

## Comandos Úteis

# Subir containers (backend, frontend e DB, dentro do backend):
docker-compose up --build
# Parar e remover containers, redes e volumes:
docker-compose down --volumes
# Acessar container backend para executar comandos:
docker-compose exec spotify-api bash
# Popular o banco:
docker-compose exec spotify-api node seedArtistas.js

## Possíveis Problemas

- **Token inválido ou expirado**: o app tenta renovar automaticamente  
- **Erro CORS**: verifica se os valores no `.env` estão corretos,especialmente FRONTEND_URI  
- **Falha ao compilar Tailwind**: este projeto **não usa Tailwind**, apenas CSS clássico.

---

## Melhorias Futuras

- Conectar com base de dados real  
- Adicionar favoritos ou reprodução de previews  
- Tornar a aplicação responsiva (mobile/tablet)  
- Adicionar suporte a Dark Mode dinâmico

---

## Projeto Académico

Este projeto foi desenvolvido como parte da unidade curricular **Desenvolvimento Web 2**, com foco na integração entre **frontend e backend**, utilizando autenticação **OAuth 2.0 com Spotify** e **API RESTful**.
