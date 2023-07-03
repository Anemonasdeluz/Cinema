//  Importamos el validador de express
const { check } = require('express-validator');
const { validadorResultado } = require('../utils/validacion');
// Validar los datos de entrada de las peticiones
const validadorCinemas = [
    check('titulo')
        .exists().withMessage("Favor ingresar titulo en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio")
        .isLength({min: 3, max: 64}).withMessage("Favor este campo debe etnner un minimo de 3 y un maximo 64"),
    check('descripcion')
        .exists().withMessage("Favor ingresar descripcion en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio"),
    check('adulto')
        .exists().withMessage("Favor debe ir el atributo adulto")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isInt({ min: 0, max: 1 }).withMessage("Favor colocar 1 si es verdadero o 0 si es falso"),
    check('id_sala')
        .exists().withMessage("Favor ingresar id de la sala en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio")
        .isInt({min: 1}).withMessage("Favor solo debe ingresar numeros"),
    check('id_asiento')
        .exists().withMessage("Favor ingresar id del asiento en JSON")
        .notEmpty().withMessage("Favor este campo no puede venir vacio")
        .isInt({min: 1}).withMessage("Favor solo debe ingresar numeros"),
    (req, res, next) => {
        return validadorResultado(req, res, next);
    }
];
//  Exportamos el validador
module.exports = {
    validadorCinemas
}