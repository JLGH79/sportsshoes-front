import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Usuarios from "./pages/Usuarios";
import Pedidos from "./pages/Pedidos";
import Historial from "./pages/Historial";
import Administracion from "./pages/Administracion";

function App() {
  const [logueado, setLogueado] = useState(
    localStorage.getItem("logueado") === "true"
  );

  const iniciarSesion = () => {
    localStorage.setItem("logueado", "true");
    setLogueado(true);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("logueado");
    setLogueado(false);
  };

  if (!logueado) {
    return <Login onLogin={iniciarSesion} />;
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="content">
        <Navbar onLogout={cerrarSesion} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/admin" element={<Administracion />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;