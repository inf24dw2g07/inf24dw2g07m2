import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login"); // Proteção da página
      return;
    }

    axios
      .get("http://localhost:5000/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsuarios(res.data))
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
        alert("Erro ao carregar os usuários.");
      });
  }, [navigate]);

  return (
    <div className="container">
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            {user.display_name} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
