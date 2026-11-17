
const { Router } = require('express')
const controller = require('../controllers/producto.controller')

const router = Router()

router.get('/', controller.listarProductos);
router.get('/:id', controller.obtenerProducto);
router.post('/', controller.crearProducto);
router.put('/:id', controller.actualizarProducto);
router.delete('/:id', controller.eliminarProducto);

module.exports = router
