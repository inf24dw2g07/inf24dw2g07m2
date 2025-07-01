function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#111",
      color: "#fff",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#222",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ fontSize: "26px", marginBottom: "10px" }}>Bem-vindo à Spotify App</h1>
        <p style={{ fontSize: "14px", color: "#ccc", marginBottom: "30px" }}>
          Para continuar, conecte-se com sua conta Spotify.
        </p>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#1DB954",
            color: "white",
            padding: "12px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1ed760")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1DB954")}
        >
          Login com Spotify
        </button>
      </div>
    </div>
  );
}

export default Login;
