// Obtenemos el metodo Router de express
const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');
//CONTROLADORES
const obtenerAsientos = async (req, res) => {
    try {
        const db = await database();
        //  METODO PARA OBTENER TODOS LOS ASIENTOS
        const sql = `
            SELECT 
                a.id_asiento,
                a.nombre, 
                a.id_sala,
                a.vendido       
            FROM asiento a
        `;
        //EJECUTAMOS LA CONSULTA
        const [rows] = await db.query(sql);
        //RETORNAMOS LA RESPUESTA
        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_Asientos");
    }
}
//  AGREGAMOS UN ASIENTO
const agregarAsiento = async (req, res) => {

    try {
        const { nombre, id_sala, vendido } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usuario = usuario.id;
        const db = await database();

        const sql = `
            INSERT INTO asiento(nombre, id_sala, vendido, id_user)
            VALUES('${nombre}',${id_sala}, ${vendido}, ${id_usuario})
        `;
        // EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no haz seleccionado un Asiento"
                }
            );
        }
        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_Asiento")
    }
}
//  METODO PARA OBTENER UNA Asiento
const obtenerAsiento = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                a.id_asiento,
                a.nombre, 
                a.id_sala,
                a.vendido       
            FROM asiento a
        WHERE a.id_asiento = ${id}
    `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-Asiento")
    }
}
//  METODO PARA OBTENER UNA Asiento POR NOMBRE
const obtenerAsientoNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                a.id_asiento,
                a.nombre, 
                a.id_sala,
                a.vendido       
            FROM asiento a
        WHERE a.nombre like '${name}%'

    `;
       //EJECUTAMOS LA CONSULTA 
       const [rows] = await db.query(sql);
       res.json(
           {
               "ok": true,
               data: rows
           }
       );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DEL-ASIENTO")
    }
}
// Metodos para editar
const editarAsiento = async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre, id_sala} = req.body;
        const db = await database();
        const sql = `
            UPDATE asiento SET
                nombre = '${nombre}',
                id_sala = ${id_sala}
            WHERE id_Asiento = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar el Asiento");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "ok": true,
            "msj": "Se edito correctamente el Asiento"
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en PUT Asiento");
    }
}
// Metodos para eliminar
const eliminarAsiento = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM asiento WHERE id_asiento = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar el Asiento");
        }

        return res.json(
            {
                "ok": true,
                "msj": "Asiento fue eliminado correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE Asiento");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = {  
    obtenerAsientos,
    obtenerAsiento,
    obtenerAsientoNombre,
    agregarAsiento,
    editarAsiento,
    eliminarAsiento           
}