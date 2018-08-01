const axios = require('axios');
require('../config/config');

getToken = (req, res, next) => {
    //console.log("Verificando token en middleware");
    let token = req.get('token');
    if (!token) {
        return res.status(500).json({
            exito: false,
            mensaje: "Token no válido"
        });
    } else {
        req.token = token;
        next();
    }


}
refreshToken = (req, res, next) => {
    //console.log("Verificando token en middleware");
    let token = req.get('token');
    axios.post(process.env.URL_API, {
            "client_id": process.env.CLIENT_ID,
            "client_secret": process.env.CLIENT_SECRET,
            "code": process.env.CODE,
            "refresh_token": token,
            "grant_type": "refresh_token",
            "redirect_uri": process.env.REDIRECT_URI
        }).then((response) => {
            console.log(response.data);
            process.env.REFRESH = response.data.refresh_token;
            req.token = response.data.access_token;
            next();
        })
        .catch((error) => {
            console.log("Imposible de actualizar el token utilzando antiguo");
            req.token = token;
            next();
        });
}
module.exports = {
    getToken,
    refreshToken
}