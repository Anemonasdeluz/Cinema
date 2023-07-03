// Obtenemos el metodo Router de express
const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');
const { matchedData } = require('express-validator');
//CONTROLADORES
const obtenerCinemas = async (req, res) => {

    try {
        const db = await database();

        const sql = `
        SELECT 
                c.id_cinema,
                c.titulo,
                c.descripcion,
                c.adulto,
                c.id_sala,
                c.id_asiento
            FROM cinema c
        `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_Cinemas");
    }
}
//  METODO PARA AGREGAR UNA Cinemas
const agregarCinema = async (req, res) => {

    try {
        const body = matchedData(req);
        const { titulo, descripcion,  adulto,id_sala,id_asiento } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usuario = usuario.id;
        const db = await database();
        const sql = `
            INSERT INTO cinema(titulo, descripcion, adulto, id_sala, id_asiento, id_user)
            VALUES('${titulo}', '${descripcion}', ${adulto}, ${id_sala}, ${id_asiento}, ${id_usuario})
        `;
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no creaste nada de Cinemas"
                }
            );
        }
        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_Cinemas")
    }
}
//  METODO PARA OBTENER UNA Cinemas POR ID 
const obtenerCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();
        const sql = `
        SELECT 
                c.id_cinema,
                c.titulo,
                c.descripcion,
                c.adulto,
                c.id_sala,
                c.id_asiento
            FROM cinema c
        WHERE c.id_cinema = ${id}
    `;
        const [rows] = await db.query(sql);
        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_DATO-DE-Cinemas")
    }
}
//  METODO PARA OBTENER UNA VIDEO JUEGO  POR NOMBRE DE SALA
const obtenerCinemaNombreAsiento = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();
        const sql = `
        SELECT 
                c.id_cinema,
                c.titulo,
                c.descripcion,
                c.adulto,
                c.id_sala,
                c.id_asiento
            FROM cinema c
            INNER JOIN asiento s ON c.id_asiento = s.id_asiento
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
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DE-Cinemas-BUSQUEDA-POR-PLATAFORMA-POR-NOMBRE")
    }
}
//  METODO PARA OBTENER POR NOMBRE DE SALA
const obtenerCinemaNombreSala = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();
        const sql = `
        SELECT 
                c.id_cinema,
                c.titulo,
                c.descripcion,
                c.adulto,
                c.id_sala,
                c.id_asiento
            FROM cinema c
            INNER JOIN sala s ON c.id_sala = s.id_sala
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
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DE-Cinemas-BUSQUEDA-POR-PLATAFORMA-POR-NOMBRE")
    }
}
//  METODO PARA EDITAR CINEMAS
const editarCinema = async (req, res) => {

    try {
        const { id } = req.params;
        const body = matchedData(req);
        const { titulo, descripcion, id_sala, id_asiento} = req.body;
        const db = await database();
        const sql = `
            UPDATE cinema SET
                titulo = '${titulo}',
                descripcion = '${descripcion}',
                id_sala = '${id_sala}',
                id_asiento = '${id_asiento}'
            WHERE id_cinema = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);        
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar Cinemas");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "ok": true,
            "msj": "Se edito correctamente Cinemas"
        });

    } catch (error) {
        return httpError(res, "Error al editar Cinemas");
    }
}
// METODO PARA ELIMINAR UNA Cinemas
const eliminarCinema = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM cinema WHERE id_cinema = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar nada de Cinemas");
        }

        return res.json(
            {
                "ok": true,
                "msj": "Cinemas fue eliminada correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE Cinemas");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = { 
    obtenerCinemas,
    obtenerCinema,
    obtenerCinemaNombreAsiento,
    obtenerCinemaNombreSala,
    agregarCinema,
    editarCinema,
    eliminarCinema                
}   