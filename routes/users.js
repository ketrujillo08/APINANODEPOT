const express = require('express');
const request = require('request');
const { getToken } = require('../middleware/auth');
const app = express();

app.get('/', [getToken], (req, res) => {

    let token = req.token;
    let url = process.env.URL + 'pipelines/5187/opportunity_stages';

    let headers = crearHeader(token);
    request({
        method: 'GET',
        url: url,
        headers
    }, (error, response, body) => {

        if (error) {
            return res.status(500).json({
                error
            });
        }

        res.status(200).json({
            exit: true,
            contactos: JSON.parse(body)
        });
    });
});

function crearHeader(token) {
    let bearer = "bearer " + token;
    let headers = {
        'Accept': 'application/vnd.api+json',
        'Authorization': bearer,
        'Content-Type': 'application/vnd.api+json'
    }
    return headers;
}

module.exports = app;