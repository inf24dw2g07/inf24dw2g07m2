import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsuarios(res.data))
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        alert("Erro ao carregar usuários.");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen px-6 py-8 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Lista de Usuários</h1>

      <ul className="space-y-4">
        {usuarios.map((user) => (
          <CardItem
            key={user.id}
            title={user.nome}
            subtitle={user.email}
            image={null} // Não há imagem para usuários no momento
          />
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
