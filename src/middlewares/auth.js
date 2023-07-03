// Objetivo: verificar si el usuario tiene un token valido
const jwt = require('./../utils/jsonwebtoken')
// Metodo que verifica si el usuario tiene un token valido
const TokenOK = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ").pop();
        const existo = jwt.verificarToken(token);
        if (!existo) {
            //que token no sirve
            return res.status(400).json(
                {
                    "ok": false,
                    "msj": "token no valido"
                }
            );
        }

        next();
    } catch (error) {
        return res.status(400).json(
            {
                "ok": false,
                "msj": "token no valido try-catch"
            }
        );
    }
}
// Metodo que obtiene los datos del usuario desde el token
const obtenerData = (token) => {
    try {
        const data = jwt.verificarToken(token);
        if (!data) {
            return false
        }
        return data;
    } catch (error) {
        console.log("obtener data try-catch");
        return false;
    }
}
// Exporto el metodo
module.exports = {
    TokenOK,
    obtenerData
}