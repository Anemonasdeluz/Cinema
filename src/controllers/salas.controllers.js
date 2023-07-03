// Obtenemos el metodo Router de express
const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');
//CONTROLADORES
const obtenerSalas = async (req, res) => {
    try {
        const db = await database();
        //  METODO PARA OBTENER TODAS LAS SALAS
        const sql = `
            SELECT 
                s.id_sala,
                s.nombre        
            FROM sala s
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
        httpError(res, "ERROR_GET_Salas");
    }
}
//  METODO PARA AGREGAR UNA SALA
const agregarSala = async (req, res) => {

    try {
        const { nombre, estado } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usuario = usuario.id;
        const db = await database();

        const sql = `
            INSERT INTO sala(nombre, id_user)
            VALUES('${nombre}', ${id_usuario})
        `;
        // EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no agregaste una Sala"
                }
            );
        }
        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_Sala")
    }
}
//  METODO PARA OBTENER UNA SALA
const obtenerSala = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                s.id_sala,
                s.nombre        
            FROM sala s
        WHERE s.id_sala = ${id}
    `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-Sala")
    }
}
//  METODO PARA OBTENER UNA Sala POR NOMBRE
const obtenerSalaNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                s.id_sala,
                s.nombre        
            FROM sala s
        WHERE s.nombre like '${name}%'

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
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DE-LA-Sala-POR-NOMBRE")
    }
}
// Metodos para editar
const editarSala = async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre, estado} = req.body;
        const db = await database();
        const sql = `
            UPDATE sala SET
                nombre = '${nombre}'
            WHERE id_sala = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar Sala");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "ok": true,
            "msj": "Se edito correctamente  la Sala"
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en PUT Sala");
    }
}
// Metodos para eliminar
const eliminarSala = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM sala WHERE id_sala = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar la Sala");
        }

        return res.json(
            {
                "ok": true,
                "msj": "Sala fue eliminada correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE Sala");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = {  
    obtenerSalas,
    obtenerSala,
    obtenerSalaNombre,
    agregarSala,
    editarSala,
    eliminarSala           
}