import {
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaSyncAlt,
} from "react-icons/fa";

function Navbar() {
  const fecha = new Date().toLocaleDateString("es-AR");

  const hora = new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="navbar-premium">

      <div className="navbar-left">
        <h2>Panel de Administración</h2>
        <span>Sports & Shoes Management System</span>
      </div>

      <div className="navbar-right">

        <div className="navbar-box">
          <FaCalendarAlt />
          <span>{fecha}</span>
        </div>

        <div className="navbar-box">
          <FaClock />
          <span>{hora}</span>
        </div>

        <div className="navbar-box">
          <FaUserCircle />
          <span>Administrador</span>
        </div>

        <button
          className="btn-refresh"
          onClick={() => window.location.reload()}
        >
          <FaSyncAlt />
          Actualizar
        </button>

      </div>

    </header>
  );
}

export default Navbar;