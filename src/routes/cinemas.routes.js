// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerCinemas,
    obtenerCinema,
    obtenerCinemaNombreAsiento,
    obtenerCinemaNombreSala,
    agregarCinema,
    editarCinema,
    eliminarCinema } = require('../controllers/cinemas.controllers');
//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenOK } = require('../middlewares/auth');
const { validadorCinemas } = require('../validators/cinemas.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE RECETAS
router.get('/', obtenerCinemas);
router.post('/', [TokenOK, validadorCinemas], agregarCinema);
router.get('/:id', obtenerCinema);
router.get('/sala/:name', obtenerCinemaNombreSala);
router.get('/asiento/:name', obtenerCinemaNombreAsiento);
router.put('/:id',TokenOK, editarCinema);
router.delete('/:id',TokenOK, eliminarCinema);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;