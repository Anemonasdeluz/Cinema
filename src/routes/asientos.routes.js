// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerAsientos,
    obtenerAsiento,
    obtenerAsientoNombre,
    agregarAsiento,
    editarAsiento,
    eliminarAsiento } = require('../controllers/asientos.controllers');

//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenOK } = require('../middlewares/auth');
const { validadorAsientos } = require('../validators/asientos.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE CATEGORIAS
router.get('/', obtenerAsientos);
router.post('/', TokenOK, [validadorAsientos], agregarAsiento);
router.get('/nombre/:name', obtenerAsientoNombre);
router.get('/:id', obtenerAsiento);
router.put('/:id',TokenOK, editarAsiento);
router.delete('/:id',TokenOK, eliminarAsiento);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;