// Sucesso.jsx
import { Link } from "react-router-dom";

function Sucesso() {
  return (
    <div className="container">
      <h1>🎉 Cadastro realizado com sucesso!</h1>
      <p>Obrigado por te registares na aplicação.</p>
      <Link to="/">Voltar ao Início</Link>
    </div>
  );
}

export default Sucesso;

