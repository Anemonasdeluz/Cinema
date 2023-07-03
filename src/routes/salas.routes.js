// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerSalas,
    obtenerSala,
    obtenerSalaNombre,
    agregarSala,
    editarSala,
    eliminarSala } = require('../controllers/salas.controllers');

//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenOK } = require('../middlewares/auth');
const { validadorSalas } = require('../validators/salas.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE CATEGORIAS
router.get('/', obtenerSalas);
router.post('/', TokenOK, [validadorSalas], agregarSala);
router.get('/nombre/:name', obtenerSalaNombre);
router.get('/:id', obtenerSala);
router.put('/:id',TokenOK, editarSala);
router.delete('/:id',TokenOK, eliminarSala);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;