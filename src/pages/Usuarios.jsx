import { useEffect, useState } from "react";
import api from "../services/api";

const usuarioInicial = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  telefono: "",
};

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(usuarioInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const cargarUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
      setError("");
    } catch {
      setError("No se pudieron cargar los usuarios.");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(u.id).includes(busqueda)
  );

  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm(usuarioInicial);
    setEditandoId(null);
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await api.put(`/usuarios/${editandoId}`, form);
        setMensaje("Usuario actualizado correctamente.");
      } else {
        await api.post("/usuarios", form);
        setMensaje("Usuario agregado correctamente.");
      }

      limpiarFormulario();
      cargarUsuarios();
      setError("");
    } catch {
      setError("No se pudo guardar el usuario. Revisa los datos enviados.");
    }
  };

  const editarUsuario = (usuario) => {
    setEditandoId(usuario.id);
    setForm({
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      email: usuario.email || "",
      password: usuario.password || "",
      telefono: usuario.telefono || "",
    });
    setMensaje("");
  };

  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este usuario?");
    if (!confirmar) return;

    try {
      await api.delete(`/usuarios/${id}`);
      setMensaje("Usuario eliminado correctamente.");
      cargarUsuarios();
    } catch {
      setError("No se pudo eliminar el usuario. Puede tener pedidos asociados.");
    }
  };

  return (
    <section className="card">
      <h2>Gestión de Usuarios</h2>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <form className="formulario" onSubmit={guardarUsuario}>
        <h3>{editandoId ? "Editar Usuario" : "Agregar Usuario"}</h3>

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
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={manejarCambio}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={manejarCambio}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={manejarCambio}
        />

        <div className="acciones-form">
          <button type="submit">
            {editandoId ? "Actualizar Usuario" : "Agregar Usuario"}
          </button>

          {editandoId && (
            <button type="button" className="btn-secundario" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Usuarios registrados</h3>

      <input
        className="buscador"
        type="text"
        placeholder="Buscar usuario por ID, nombre, apellido o email..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>
                  <button className="btn-editar" onClick={() => editarUsuario(u)}>
                    ✏ Editar
                  </button>

                  <button className="btn-eliminar" onClick={() => eliminarUsuario(u.id)}>
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

export default Usuarios;