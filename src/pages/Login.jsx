import { useState } from "react";
import { FaShoePrints, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [error, setError] = useState("");

  const ingresar = (e) => {
    e.preventDefault();

    if (usuario === "admin" && password === "123456") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={ingresar}>
        <FaShoePrints className="login-logo" />

        <h1>Sports & Shoes</h1>
        <p>Panel de Administración</p>

        {error && <span className="error">{error}</span>}

        <div className="login-input">
          <FaUser />
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="login-input">
          <FaLock />
          <input
            type={verPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="btn-ver-password"
            onClick={() => setVerPassword(!verPassword)}
          >
            {verPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit">Ingresar</button>

        <small>Usuario: admin | Contraseña: 123456</small>
      </form>
    </div>
  );
}

export default Login;