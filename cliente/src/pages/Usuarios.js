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
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setUsuarios(res.data))
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        alert("Erro ao carregar usuários.");
      });
  }, [navigate]);

  return (
    <div className="container">
      <h1>👥 Lista de Usuários</h1>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
        {usuarios.map((user) => (
          <li
            key={user.id}
            style={{
              backgroundColor: "#2a2a2a",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
          >
            <strong>{user.nome}</strong> — <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
