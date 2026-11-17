// Controlador de clientes: operaciones CRUD usando MySQL.
const { pool } = require("../config/database");

// Revisar los datos recibidos antes de guardar en la base de datos.
const validarCampos = (datos = {}) => {
  const { apellidos, nombres, telefono, direccion, email } = datos;
  const errores = [];
  if (typeof apellidos !== "string" || apellidos.trim() === "")
    errores.push("El campo apellidos es obligatorio");
  if (typeof nombres !== "string" || nombres.trim() === "")
    errores.push("El campo nombres es obligatorio");
  if (typeof telefono !== "string" || telefono.trim() === "")
    errores.push("El campo telefono es obligatorio");
  if (typeof direccion !== "string" || direccion.trim() === "")
    errores.push("El campo direccion es obligatorio");
  if (typeof email !== "string" || email.trim() === "")
    errores.push("El campo email es obligatorio");
  if (
    typeof email === "string" &&
    email.trim() !== "" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
    errores.push("El email no es válido");
  return errores;
};

// GET /api/clientes
const listarClientes = async (req, res) => {
  try {
    const [registros] = await pool.query("SELECT * FROM clientes ORDER BY id");
    return res
      .status(200)
      .json({ ok: true, total: registros.length, data: registros });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// Verificar que el ID recibido sea un número entero positivo.
const obtenerId = (req) => {
  const id = Number(req.params.id);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

// GET /api/clientes/:id
const obtenerCliente = async (req, res) => {
  try {
    const id = obtenerId(req);
    if (id === null)
      return res
        .status(400)
        .json({ ok: false, message: "El ID debe ser un entero positivo" });
    const [registros] = await pool.execute(
      "SELECT * FROM clientes WHERE id = ?",
      [id],
    );
    if (registros.length === 0)
      return res
        .status(404)
        .json({ ok: false, message: "No existe el cliente" });
    return res.status(200).json({ ok: true, data: registros[0] });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// POST /api/clientes
const crearCliente = async (req, res) => {
  try {
    const errores = validarCampos(req.body);
    if (errores.length > 0)
      return res
        .status(400)
        .json({
          ok: false,
          message: "Verifique los datos solicitados",
          errores,
        });
    const { apellidos, nombres, telefono, direccion, email } = req.body;
    const consulta =
      "INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES (?, ?, ?, ?, ?)";
    const [resultado] = await pool.execute(consulta, [
      apellidos,
      nombres,
      telefono,
      direccion,
      email,
    ]);
    return res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// PUT /api/clientes/:id
const actualizarCliente = async (req, res) => {
  try {
    const id = obtenerId(req);
    if (id === null)
      return res
        .status(400)
        .json({ ok: false, message: "El ID debe ser un entero positivo" });
    const errores = validarCampos(req.body);
    if (errores.length > 0)
      return res
        .status(400)
        .json({
          ok: false,
          message: "Verifique los datos solicitados",
          errores,
        });
    const [existe] = await pool.execute(
      "SELECT id FROM clientes WHERE id = ?",
      [id],
    );
    if (existe.length === 0)
      return res
        .status(404)
        .json({ ok: false, message: "No existe el cliente" });
    const { apellidos, nombres, telefono, direccion, email } = req.body;
    const consulta =
      "UPDATE clientes SET apellidos = ?, nombres = ?, telefono = ?, direccion = ?, email = ?, updated_at = NOW() WHERE id = ?";
    const [resultado] = await pool.execute(consulta, [
      apellidos,
      nombres,
      telefono,
      direccion,
      email,
      id,
    ]);
    return res
      .status(200)
      .json({ ok: true, filasAfectadas: resultado.affectedRows });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// DELETE /api/clientes/:id
const eliminarCliente = async (req, res) => {
  try {
    const id = obtenerId(req);
    if (id === null)
      return res
        .status(400)
        .json({ ok: false, message: "El ID debe ser un entero positivo" });
    const [resultado] = await pool.execute(
      "DELETE FROM clientes WHERE id = ?",
      [id],
    );
    if (resultado.affectedRows === 0)
      return res
        .status(404)
        .json({ ok: false, message: "No existe el cliente" });
    return res
      .status(200)
      .json({
        ok: true,
        message: "Cliente eliminado correctamente",
        filasAfectadas: resultado.affectedRows,
      });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
