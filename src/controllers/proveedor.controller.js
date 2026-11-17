// Controlador de proveedores: operaciones CRUD usando MySQL.
const { pool } = require("../config/database");

// Revisar los datos recibidos antes de guardar en la base de datos.
const validarCampos = (datos = {}) => {
  const { razonsocial, contacto, ruc, direccion } = datos;
  const errores = [];
  if (typeof razonsocial !== "string" || razonsocial.trim() === "")
    errores.push("El campo razonsocial es obligatorio");
  if (typeof contacto !== "string" || contacto.trim() === "")
    errores.push("El campo contacto es obligatorio");
  if (typeof ruc !== "string" || ruc.trim() === "")
    errores.push("El campo ruc es obligatorio");
  if (typeof direccion !== "string" || direccion.trim() === "")
    errores.push("El campo direccion es obligatorio");
  if (typeof ruc === "string" && ruc.trim() !== "" && !/^\d{11}$/.test(ruc))
    errores.push("El RUC debe tener 11 dígitos");
  return errores;
};

// GET /api/proveedores
const listarProveedores = async (req, res) => {
  try {
    const [registros] = await pool.query(
      "SELECT * FROM proveedores ORDER BY id",
    );
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

// GET /api/proveedores/:id
const obtenerProveedor = async (req, res) => {
  try {
    const id = obtenerId(req);
    if (id === null)
      return res
        .status(400)
        .json({ ok: false, message: "El ID debe ser un entero positivo" });
    const [registros] = await pool.execute(
      "SELECT * FROM proveedores WHERE id = ?",
      [id],
    );
    if (registros.length === 0)
      return res
        .status(404)
        .json({ ok: false, message: "No existe el proveedor" });
    return res.status(200).json({ ok: true, data: registros[0] });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// POST /api/proveedores
const crearProveedor = async (req, res) => {
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
    const { razonsocial, contacto, ruc, direccion } = req.body;
    const consulta =
      "INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES (?, ?, ?, ?)";
    const [resultado] = await pool.execute(consulta, [
      razonsocial,
      contacto,
      ruc,
      direccion,
    ]);
    return res.status(201).json({ ok: true, id: resultado.insertId });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// PUT /api/proveedores/:id
const actualizarProveedor = async (req, res) => {
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
      "SELECT id FROM proveedores WHERE id = ?",
      [id],
    );
    if (existe.length === 0)
      return res
        .status(404)
        .json({ ok: false, message: "No existe el proveedor" });
    const { razonsocial, contacto, ruc, direccion } = req.body;
    const consulta =
      "UPDATE proveedores SET razonsocial = ?, contacto = ?, ruc = ?, direccion = ?, updated_at = NOW() WHERE id = ?";
    const [resultado] = await pool.execute(consulta, [
      razonsocial,
      contacto,
      ruc,
      direccion,
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

// DELETE /api/proveedores/:id
const eliminarProveedor = async (req, res) => {
  try {
    const id = obtenerId(req);
    if (id === null)
      return res
        .status(400)
        .json({ ok: false, message: "El ID debe ser un entero positivo" });
    const [resultado] = await pool.execute(
      "DELETE FROM proveedores WHERE id = ?",
      [id],
    );
    if (resultado.affectedRows === 0)
      return res
        .status(404)
        .json({ ok: false, message: "No existe el proveedor" });
    return res
      .status(200)
      .json({
        ok: true,
        message: "Proveedor eliminado correctamente",
        filasAfectadas: resultado.affectedRows,
      });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno en el servidor" });
  }
};

// El alias conserva compatibilidad con la ruta del ZIP anterior.
module.exports = {
  listarProveedores,
  listarProveedors: listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
