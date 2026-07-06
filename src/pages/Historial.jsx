import { useEffect, useState } from "react";
import api from "../services/api";

function Historial() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");

  const cargarPedidos = async () => {
    try {
      const res = await api.get("/pedidos");
      setPedidos(res.data);
      setError("");
    } catch {
      setError("No se pudo cargar el historial de pedidos.");
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cambiarEstado = async (id, estado) => {
    try {
      await api.patch(`/pedidos/${id}/estado?estado=${estado}`);
      cargarPedidos();
    } catch {
      setError("No se pudo actualizar el estado del pedido.");
    }
  };

  return (
    <section className="card">
      <h2>Historial de Pedidos</h2>

      {error && <p className="error">{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Productos</th>
              <th>Cambiar Estado</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>
                  {pedido.usuario?.nombre} {pedido.usuario?.apellido}
                </td>
                <td>{new Date(pedido.fecha).toLocaleString("es-AR")}</td>
               <td>
                <span className={`estado estado-${pedido.estado.toLowerCase()}`}>
                {pedido.estado}
                </span>
                </td>
                <td>${Number(pedido.total).toLocaleString("es-AR")}</td>
                <td>
                  {pedido.lineas?.map((linea) => (
                    <div key={linea.id}>
                      {linea.producto?.nombre} x {linea.cantidad}
                    </div>
                  ))}
                </td>
                <td>
                  <select
                    value={pedido.estado}
                    onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CONFIRMADO">CONFIRMADO</option>
                    <option value="ENVIADO">ENVIADO</option>
                    <option value="ENTREGADO">ENTREGADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Historial;