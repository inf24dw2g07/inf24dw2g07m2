import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  if (!token) return null; // Não mostra a navbar se não estiver autenticado

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}> Spotify App</Link>
      </div>
      <div style={styles.center}>
        <Link to="/" style={styles.link}>Início</Link>
        <Link to="/usuarios" style={styles.link}>Usuários</Link>
        <Link to="/perfil" style={styles.link}>Meu Perfil</Link>
        <Link to="/topartistas" style={styles.link}>Top Artistas</Link>
        <Link to="/playlists" style={styles.link}>Playlists</Link>
      </div>
      <div style={styles.right}>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#1e1e1e',
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1db954',
    textDecoration: 'none',
  },
  center: {
    display: 'flex',
    gap: '20px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#1db954',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '15px',
    transition: 'background-color 0.3s',
  }
};

export default Navbar;
