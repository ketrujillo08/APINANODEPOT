const express = require("express");
const app = express();

app.post("/", (req, res) => {
    let nombre = req.query.nombre;
    let email = req.query.email;

    res.json({
        success: true,
        body: {
            nombre,
            email
        }
    });

});

module.exports = app;