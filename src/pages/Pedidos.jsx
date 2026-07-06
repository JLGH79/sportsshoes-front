import { useEffect, useState } from "react";
import api from "../services/api";

function Pedidos() {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const resUsuarios = await api.get("/usuarios");
      const resProductos = await api.get("/productos");

      setUsuarios(resUsuarios.data);
      setProductos(resProductos.data);

      if (resUsuarios.data.length > 0) {
        setUsuarioId(String(resUsuarios.data[0].id));
      }

      if (resProductos.data.length > 0) {
        setProductoId(String(resProductos.data[0].id));
      }
    } catch {
      setError("No se pudieron cargar usuarios o productos.");
    }
  };

  const productoSeleccionado = productos.find(
    (p) => String(p.id) === String(productoId)
  );

  const totalEstimado = productoSeleccionado
    ? Number(productoSeleccionado.precio) * Number(cantidad)
    : 0;

  const crearPedido = async (e) => {
    e.preventDefault();

    const pedido = {
      usuarioId: Number(usuarioId),
      productosIds: [Number(productoId)],
      cantidades: [Number(cantidad)],
    };

    try {
      await api.post("/pedidos", pedido);
      setMensaje("Pedido creado correctamente.");
      setError("");
      setCantidad(1);
      cargarDatos();
    } catch {
      setError("No se pudo crear el pedido. Verifica stock o datos enviados.");
      setMensaje("");
    }
  };

  return (
    <section className="card">
      <h2>Realizar Pedido</h2>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <form className="formulario" onSubmit={crearPedido}>
        <h3>Nuevo Pedido</h3>

        <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} required>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} {u.apellido} - {u.email}
            </option>
          ))}
        </select>

        <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - Stock: {p.stock}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
          required
        />

        <div className="resumen-pedido">
          <h3>Resumen</h3>
          <p>
            Producto:{" "}
            <strong>{productoSeleccionado ? productoSeleccionado.nombre : "Ninguno"}</strong>
          </p>
          <p>
            Precio unitario:{" "}
            <strong>
              ${productoSeleccionado ? Number(productoSeleccionado.precio).toLocaleString("es-AR") : 0}
            </strong>
          </p>
          <p>
            Cantidad: <strong>{cantidad}</strong>
          </p>
          <p>
            Total estimado:{" "}
            <strong>${Number(totalEstimado).toLocaleString("es-AR")}</strong>
          </p>
        </div>

        <button type="submit">🛒 Crear Pedido</button>
      </form>
    </section>
  );
}

export default Pedidos;