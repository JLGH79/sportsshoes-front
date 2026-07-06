import { useEffect, useState } from "react";
import api from "../services/api";

const productoInicial = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  marca: "",
  imagen: "",
  categoriaId: "",
};

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(productoInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const cargarProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
      setError("");
    } catch {
      setError("No se pudieron cargar los productos.");
    }
  };

  const cargarCategorias = async () => {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);

      if (res.data.length > 0) {
        setForm((prev) => ({
          ...prev,
          categoriaId: prev.categoriaId || String(res.data[0].id),
        }));
      }
    } catch {
      setError("No se pudieron cargar las categorías.");
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(p.id).includes(busqueda)
  );

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const limpiarFormulario = () => {
    setForm({
      ...productoInicial,
      categoriaId: categorias.length > 0 ? String(categorias[0].id) : "",
    });
    setEditandoId(null);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const producto = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      stock: Number(form.stock),
      marca: form.marca,
      imagen: form.imagen,
      categoria: { id: Number(form.categoriaId) },
    };

    try {
      if (editandoId) {
        await api.put(`/productos/${editandoId}`, producto);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await api.post("/productos", producto);
        setMensaje("Producto agregado correctamente.");
      }

      limpiarFormulario();
      cargarProductos();
      setError("");
    } catch {
      setError("No se pudo guardar el producto. Revisa los datos enviados.");
    }
  };

  const editarProducto = (producto) => {
    setEditandoId(producto.id);
    setForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      stock: producto.stock || "",
      marca: producto.marca || "",
      imagen: producto.imagen || "",
      categoriaId: categorias.length > 0 ? String(categorias[0].id) : "",
    });
    setMensaje("");
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
      await api.delete(`/productos/${id}`);
      setMensaje("Producto eliminado correctamente.");
      cargarProductos();
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  };

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

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <form className="formulario" onSubmit={guardarProducto}>
        <h3>{editandoId ? "Editar Producto" : "Agregar Producto"}</h3>

        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} required />
        <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={manejarCambio} required />
        <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={manejarCambio} required />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={manejarCambio} required />
        <input type="text" name="marca" placeholder="Marca" value={form.marca} onChange={manejarCambio} required />
        <input type="text" name="imagen" placeholder="URL de imagen" value={form.imagen} onChange={manejarCambio} />

        <select name="categoriaId" value={form.categoriaId} onChange={manejarCambio} required>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <div className="acciones-form">
          <button type="submit">
            {editandoId ? "Actualizar Producto" : "Agregar Producto"}
          </button>

          {editandoId && (
            <button type="button" className="btn-secundario" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Productos registrados</h3>

      <input
        className="buscador"
        type="text"
        placeholder="Buscar por ID, nombre o marca..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Marca</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.imagen ? (
                    <img
  src={p.imagen || "https://via.placeholder.com/80?text=Sin+Imagen"}
  alt={p.nombre}
  className="mini-img"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/80?text=Sin+Imagen";
  }}
/>
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>${Number(p.precio).toLocaleString("es-AR")}</td>
                <td className={p.stock <= 5 ? "stock-bajo" : "stock-ok"}>{p.stock}</td>
                <td>{p.marca}</td>
                <td>
                  <button className="btn-editar" onClick={() => editarProducto(p)}>✏ Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarProducto(p.id)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Productos;