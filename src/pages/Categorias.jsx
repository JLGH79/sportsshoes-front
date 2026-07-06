import { useEffect, useState } from "react";
import api from "../services/api";

const categoriaInicial = {
  nombre: "",
  descripcion: "",
};

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(categoriaInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const cargarCategorias = async () => {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
      setError("");
    } catch {
      setError("No se pudieron cargar las categorías.");
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const categoriasFiltradas = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(c.id).includes(busqueda)
  );

  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm(categoriaInicial);
    setEditandoId(null);
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await api.put(`/categorias/${editandoId}`, form);
        setMensaje("Categoría actualizada correctamente.");
      } else {
        await api.post("/categorias", form);
        setMensaje("Categoría agregada correctamente.");
      }

      limpiarFormulario();
      cargarCategorias();
      setError("");
    } catch {
      setError("No se pudo guardar la categoría.");
    }
  };

  const editarCategoria = (categoria) => {
    setEditandoId(categoria.id);
    setForm({
      nombre: categoria.nombre || "",
      descripcion: categoria.descripcion || "",
    });
    setMensaje("");
  };

  const eliminarCategoria = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta categoría?");
    if (!confirmar) return;

    try {
      await api.delete(`/categorias/${id}`);
      setMensaje("Categoría eliminada correctamente.");
      cargarCategorias();
    } catch {
      setError("No se pudo eliminar la categoría. Puede tener productos asociados.");
    }
  };

  return (
    <section className="card">
      <h2>Gestión de Categorías</h2>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <form className="formulario" onSubmit={guardarCategoria}>
        <h3>{editandoId ? "Editar Categoría" : "Agregar Categoría"}</h3>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={manejarCambio}
        />

        <div className="acciones-form">
          <button type="submit">
            {editandoId ? "Actualizar Categoría" : "Agregar Categoría"}
          </button>

          {editandoId && (
            <button type="button" className="btn-secundario" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Categorías registradas</h3>

      <input
        className="buscador"
        type="text"
        placeholder="Buscar categoría por ID o nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categoriasFiltradas.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{cat.descripcion}</td>
                <td>
                  <button className="btn-editar" onClick={() => editarCategoria(cat)}>
                    ✏ Editar
                  </button>

                  <button className="btn-eliminar" onClick={() => eliminarCategoria(cat.id)}>
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Categorias;