import { useEffect, useState } from "react";
import api from "../services/api";

function Productos() {
const [productos, setProductos] = useState([]);

const cargarProductos = async () => {
    const res = await api.get("/productos");
    setProductos(res.data);
};

useEffect(() => {
    cargarProductos();
}, []);

return (
    <section className="card">
    <h2>Gestión de Productos</h2>

<div className="menu-box">
        <p>a) Agregar Producto</p>
        <p>b) Listar Productos</p>
        <p>c) Buscar Producto por ID</p>
        <p>d) Actualizar Producto</p>
        <p>e) Eliminar Producto</p>
        <p>f) Volver al menú principal</p>
        </div>

    <h3>Productos registrados</h3>

<div className="table-container">
        <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Marca</th>
            </tr>
        </thead>
        <tbody>
            {productos.map((p) => (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.marca}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </section>
);
}

export default Productos;