// src/services/spotifyService.js
export async function fetchArtists(token, query) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response.json();
}
