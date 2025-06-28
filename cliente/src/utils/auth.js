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

export async function renewToken() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) return null;

    try {
        const res = await fetch(`http://localhost:5000/refresh_token?refresh_token=${refreshToken}`);
        const data = await res.json();

        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            return data.access_token;
        }
    } catch (error) {
        console.error("Erro ao renovar token", error);
        return null;
    }
}
