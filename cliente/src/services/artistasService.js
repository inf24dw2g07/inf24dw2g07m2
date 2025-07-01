import axios from 'axios';

export const getArtistas = async () => {
  try {
    const res = await axios.get("http://localhost:5000/artistas");
    console.log("Resposta da API:", res.data); 
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    return []; // Retorna array vazio em caso de erro para evitar crash
  }
};
