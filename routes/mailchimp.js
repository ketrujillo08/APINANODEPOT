const express = require('express');
require('../config/config');
const request = require('request');
//MODELS
const Mailchimp = require('../models/mailchimp');
const app = express();

app.post('/list/:id/members', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let url = `${process.env.URL_MAILCHIMP_API}/lists/${id}/members`;
    let headers = setHeaders();
    let mailchimp = Mailchimp;
    mailchimp.email_address = body.email;
    mailchimp.status = body.status;
    mailchimp.merge_fields.FNAME = body.nombre;
    mailchimp.merge_fields.LNAME = body.apellido;
    mailchimp.merge_fields.PHONE = body.phone;
    mailchimp.merge_fields.LEADSOURCE = body.origen;
    mailchimp.merge_fields.ANUNCIO = body.anuncio;
    mailchimp.merge_fields.COUNTRY = body.country;
    mailchimp.merge_fields.COMPANIA = body.empresa;
    mailchimp.merge_fields.HORARIO = body.horario;

    request({
        url,
        method: 'POST',
        headers: {
            Authorization: `apikey ${process.env.API_KEY_MAILCHIMP}`,
            'Content-Type': 'application/json',
            'Content-Length': mailchimp.length

        },
        body: JSON.stringify(mailchimp)
    }, (error, response, body) => {

        if (error) {
            res.status(500).json({
                exito: false,
                mensaje: "Error en la API contactar al de soporte técnico",
                error: body
            });
        }

        res.json({
            exito: true,
            respuesta: body
        });
    });

});
app.get("/list/:id/members", (req, res) => {
    let id = req.params.id;
    let url = `${process.env.URL_MAILCHIMP_API}/lists/${id}/members`;
    let headers = setHeaders();

    request({
        url,
        method: 'GET',
        headers
    }, (error, response, body) => {
        if (error) {
            res.status(500).json({
                exito: false,
                mensaje: "Error en la API contactar al de soporte técnico",
                error
            });
        }

        res.json({
            exito: true,
            respuesta: body
        });
    });

});


function setHeaders() {
    return {
        Authorization: `apikey ${process.env.API_KEY_MAILCHIMP}`,
        'Content-Type': 'application/json'

    }
}


module.exports = app;