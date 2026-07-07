import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaExclamationTriangle,
  FaDollarSign,
} from "react-icons/fa";

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const cargarDatos = async () => {
    try {
      const resProductos = await api.get("/productos");
      const resCategorias = await api.get("/categorias");
      const resUsuarios = await api.get("/usuarios");
      const resPedidos = await api.get("/pedidos");

      setProductos(resProductos.data);
      setCategorias(resCategorias.data);
      setUsuarios(resUsuarios.data);
      setPedidos(resPedidos.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const stockBajo = productos.filter((p) => p.stock <= 5).length;

  const totalVentas = pedidos.reduce(
    (acum, p) => acum + Number(p.total || 0),
    0
  );

  return (
    <>

      <section className="hero-panel">

        <div>

          <h1>Sports & Shoes</h1>

          <p>
            Sistema de Gestión Comercial
          </p>

        </div>

      </section>

      <div className="dashboard-grid">

        <div className="premium-card">
          <FaBoxOpen className="card-icon" />
          <h3>Productos</h3>
          <h1>{productos.length}</h1>
          <small>Registrados</small>
        </div>

        <div className="premium-card">
          <FaTags className="card-icon" />
          <h3>Categorías</h3>
          <h1>{categorias.length}</h1>
          <small>Disponibles</small>
        </div>

        <div className="premium-card">
          <FaUsers className="card-icon" />
          <h3>Usuarios</h3>
          <h1>{usuarios.length}</h1>
          <small>Clientes</small>
        </div>

        <div className="premium-card">
          <FaShoppingCart className="card-icon" />
          <h3>Pedidos</h3>
          <h1>{pedidos.length}</h1>
          <small>Realizados</small>
        </div>

        <div className="premium-card danger-card">
          <FaExclamationTriangle className="card-icon" />
          <h3>Stock Bajo</h3>
          <h1>{stockBajo}</h1>
          <small>Requieren reposición</small>
        </div>

        <div className="premium-card success-card">
          <FaDollarSign className="card-icon" />
          <h3>Ventas</h3>
          <h2>
  {totalVentas.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  })}
</h2>
          <small>Total vendido</small>
        </div>

      </div>

      <section className="card">

        <h2>Resumen</h2>

        <p>

          Bienvenido al panel administrativo de
          <strong> Sports & Shoes.</strong>

        </p>

        <p>

          Desde aquí puedes administrar productos,
          categorías, usuarios y pedidos utilizando
          React + Spring Boot + MySQL.

        </p>

      </section>

    </>
  );
}

export default Dashboard;