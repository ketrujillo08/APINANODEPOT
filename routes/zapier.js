const express = require("express");
const app = express();

app.post("/", (req, res) => {
    let body = req.body;

    res.json({
        success: true,
        body
    });

});

module.exports = app;