import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaShoePrints,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaShoePrints className="logo-icon" />
        <div>
          <h1>Sports & Shoes</h1>
          <p>Admin Panel</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/">
          <FaHome /> <span>Dashboard</span>
        </NavLink>

        <NavLink to="/productos">
          <FaBoxOpen /> <span>Productos</span>
        </NavLink>

        <NavLink to="/categorias">
          <FaTags /> <span>Categorías</span>
        </NavLink>

        <NavLink to="/usuarios">
          <FaUsers /> <span>Usuarios</span>
        </NavLink>

        <NavLink to="/pedidos">
          <FaShoppingCart /> <span>Pedidos</span>
        </NavLink>

        <NavLink to="/historial">
          <FaClipboardList /> <span>Historial</span>
        </NavLink>

        <NavLink to="/admin">
          <FaCog /> <span>Administración</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <small>Proyecto Final</small>
        <strong>Talento Tech</strong>
      </div>
    </aside>
  );
}

export default Sidebar;