import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Perfil() {
    const [perfil, setPerfil] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setPerfil(res.data))
            .catch((err) => {
                console.error("Erro ao buscar dados do perfil:", err);
                alert("Erro ao carregar perfil do Spotify.");
            });
    }, [navigate]);

    if (!perfil)
        return <p className="container">Carregando perfil do Spotify...</p>;

    return (
        <div className="container">
            <h1> Perfil do Spotify</h1>
            <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
                <p><strong> Nome:</strong> {perfil.display_name}</p>
                <p><strong> Email:</strong> {perfil.email}</p>
                <p><strong> País:</strong> {perfil.country}</p>
                {perfil.images && perfil.images.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={perfil.images[0].url}
                            alt="Avatar"
                            width={120}
                            style={{ marginTop: "1rem", borderRadius: "50%" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Perfil;
