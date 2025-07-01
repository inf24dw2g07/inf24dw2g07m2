FROM node:18

WORKDIR /app/backend

# Copia só o package.json e package-lock.json da pasta backend para /app/backend no container
COPY backend/package*.json ./

# Instala as dependências na pasta /app/backend
RUN npm install

# Copia TODO o conteúdo da pasta backend para dentro de /app/backend no container
COPY backend/. ./

# Comando para iniciar o app
CMD ["node", "index.js"]



