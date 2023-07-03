// Objetivo: Validar los datos que se envian desde el cliente para crear un usuario
const { check, validationResult } = require('express-validator');
const { httpError } = require('../utils/error');
// Validar los datos que se envian desde el cliente para crear un usuario
const validadorAsientos = [
    check('nombre')
        .exists().withMessage("Favor debe ir el atributo nombre para el asiento")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('id_sala')
        .exists().withMessage("Favor debe ir el atributo id_salas para el asiento")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isInt({ min: 1 }).withMessage("Favor colocar 1 como minimo y 70 como maximo"),
    check('vendido')
        .exists().withMessage("Favor debe ir el atributo vendido para el asiento")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isInt({ min: 0, max: 1 }).withMessage("Favor colocar 1 si es verdadero o 0 si es falso"),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            return httpError(res, error.array());
        }
    }
];
// Exportamos la funcion
module.exports = {
    validadorAsientos
}