// src/utils/auth.js

// Extrai o token do fragmento da URL após o login com Spotify
export function getTokenFromUrl() {
    const hash = window.location.hash;
    if (!hash) return null;

    const token = hash
        .substring(1)
        .split('&')
        .find(e => e.startsWith('access_token'))
        ?.split('=')[1];

    const decodedToken = decodeURIComponent(token);
    console.log("TOKEN EXTRAÍDO:", decodedToken); // ← debug temporário

    window.location.hash = ''; // limpa o hash da URL
    return decodedToken;
}

// Lê o token armazenado localmente
export function getToken() {
    return localStorage.getItem('token');
}

// Apaga o token do localStorage (logout, se necessário)
export function clearToken() {
    localStorage.removeItem('token');
}
