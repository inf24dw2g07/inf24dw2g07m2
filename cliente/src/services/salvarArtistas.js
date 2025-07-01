// services/salvarArtistas.js
import axios from "axios";

export const salvarArtistas = async (artistas) => {
  try {
    const res = await axios.post("http://localhost:3001/artistas", artistas);
    return res.data;
  } catch (error) {
    console.error("Erro ao salvar artistas no backend:", error);
    throw error;
  }
};
