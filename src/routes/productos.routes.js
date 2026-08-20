const {Router} = require('express');
const { getProductos, getProductoById, createProducto, createProductos, updateProducto,deleteProducto } = require('../controllers/productos.controller');


const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoById);
router.post('/productos', createProducto);
router.post('/productos/bulk', createProductos);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

module.exports = router;