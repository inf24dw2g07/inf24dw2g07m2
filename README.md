# inf24dw2g07m2

Desenvolvimento de uma Aplicação Web Cliente de Spotify (React App + Backend Node.js)

Este projeto simula uma aplicação semelhante ao Spotify, construída com **React.js** no frontend e **Node.js + Express** no backend. A autenticação é feita com a API oficial do Spotify (OAuth 2.0).

---

## Requisitos

- Node.js **v18** ou superior  
- Conta Spotify Developer  
- Navegador moderno (Chrome, Firefox, etc.)

---

## Estrutura de Pastas

```
INF24DW2G07M2/
├── backend/                   Backend (Node.js + Express)
│   ├── .env                   Variáveis de ambiente do backend
│   └── index.js               Ponto de entrada do servidor Express

├── cliente/                   Frontend React
│   ├── node_modules/          Módulos do cliente (React)
│   ├── public/                Ficheiros estáticos (favicon, etc.)
│   ├── src/                   Código-fonte React
│   ├── .env                   Variáveis de ambiente do React
│   ├── package.json           Dependências do cliente
│   └── postcss.config.js      (Se for usar Tailwind ou pós-processamento)

├── node_modules/              Dependências do projeto raiz (caso uses nodemon ou outras libs globais)
├── .gitignore                 Ignora `node_modules`, `.env`, etc.
├── package.json               (raiz, se usado para ferramentas do projeto geral)
├── README.md                  Manual de instalação e instruções — está na raiz, correto.
```

---

## Variáveis de Ambiente

### `backend/.env`

```
CLIENT_ID=seu_client_id_do_spotify
CLIENT_SECRET=seu_client_secret
REDIRECT_URI=http://localhost:5000/callback
FRONTEND_URI=http://localhost:3000
```

### `cliente/.env`

```
REACT_APP_SPOTIFY_CLIENT_ID=seu_client_id_do_spotify
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:5000/login
```

>  **Importante**: Não inclua aspas nem espaços extras nos valores.

---

## Como Rodar o Projeto

### 1. Backend (Node.js)

```bash
cd backend
npm install
node index.js
```

O servidor será iniciado em: [http://localhost:5000](http://localhost:5000)

---

### 2. Frontend (React)

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

## Funcionalidades Incluídas

- Login com Spotify  
- Registro do usuário no backend  
- Visualizar top artistas  
- Visualizar playlists  
- Visualizar perfil  
- Renovação automática de token (via `refresh_token`)  
- Interface personalizada com CSS tradicional

---

## Erros Comuns

- **Token inválido ou expirado**: o app tenta renovar automaticamente  
- **Erro CORS**: verifica se os valores no `.env` estão corretos  
- **Falha ao compilar Tailwind**: este projeto **não usa Tailwind**, mas CSS clássico

---

## Melhorias Futuras

- Conectar com base de dados real  
- Adicionar favoritos ou reprodução de previews  
- Tornar a aplicação responsiva (mobile/tablet)  
- Adicionar suporte a Dark Mode dinâmico

---

## Projeto Académico

Este projeto foi desenvolvido no contexto da disciplina de **Desenvolvimento Web 2**, com foco na integração entre frontend e backend utilizando **OAuth 2.0** e **API RESTful**.
