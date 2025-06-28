// src/components/Sucesso.js

import React from "react";
import { Link } from "react-router-dom";

function Sucesso() {
  return (
    <div className="container">
      <h1>Cadastro concluído!</h1>
      <p>Agora você pode explorar os seus dados do Spotify na aplicação.</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}

export default Sucesso;



