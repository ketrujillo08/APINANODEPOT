const express = require("express");
const middleware = require("../middleware/auth");
const app = express();

app.get("/", [middleware.getToken], (req, res) => {
    console.log("Inicio prueba raiz");
    res.status(200).json({
        exito: true,
        mensaje: "Consulta GET exitosa"
    });
});

module.exports = app;