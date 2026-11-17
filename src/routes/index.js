// Nuestra aplicación puede tener muchos módulos
// Productos > producto.controller > producto.routes
// Clientes > cliente.controller > cliente.routes
// Proveedores > proveedor.controller > proveedor.routes

const { Router } = require("express");

// Importamos las rutas de cada módulo
const productoRoutes = require("./producto.routes");
const clienteRoutes = require("./cliente.routes");
const proveedorRoutes = require("./proveedor.routes");

// Creamos el router principal
const router = Router();

// Registramos las rutas de cada módulo
router.use("/productos", productoRoutes);
router.use("/clientes", clienteRoutes);
router.use("/proveedores", proveedorRoutes);

// Exportamos todas las rutas
module.exports = router;
