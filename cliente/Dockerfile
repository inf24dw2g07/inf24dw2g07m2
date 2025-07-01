# Dockerfile frontend

# Imagem base Node.js para build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build da aplicação React para produção
RUN npm run build

# Imagem base do nginx para servir o conteúdo estático
FROM nginx:alpine

# Copia o build para a pasta padrão do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 3000 (ou 80, nginx usa 80 por padrão)
EXPOSE 80

# Comando padrão para rodar nginx
CMD ["nginx", "-g", "daemon off;"]
