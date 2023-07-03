// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { agregarUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerTodo,
    obtenerUnoSolo } = require('./../controllers/usuario.controller');
const { TokenOK } = require('./../middlewares/auth');
const { validadorUsuario } = require('./../validators/usuario.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//  METODOS DE NUESTRA RUTA
router.get('/', TokenOK, obtenerTodo);
router.get('/:id', TokenOK, obtenerUnoSolo);
router.post('/', [validadorUsuario], agregarUsuario);
router.put('/:id', TokenOK, editarUsuario);
router.delete('/:id', TokenOK, eliminarUsuario);
//  EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;