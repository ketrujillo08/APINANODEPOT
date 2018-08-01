const express = require('express');
const axios = require('axios');
const { getToken } = require('../middleware/auth');
const { sorteo } = require('../middleware/roundrobin');
require('../config/config');
const request = require('request');


const Contacto = require('../models/contacto');
const Oportunidad = require('../models/oportunidad');

const app = express();

app.post('/', [getToken, sorteo], async(req, res) => {
    let body = req.body;

    //console.log("user", contacto.data.relationships.user.data.id);
    let contactoInit = await crearContacto(req.headers, body)
        .catch((error) => {
            return res.status(500).json({
                exito: false,
                mensaje: "No se creo la oportunidad",
                error
            });
        });
    let oportunidadInit = await crearOportunidad(req.headers, body.nombre)
        .catch((error) => {
            return res.status(500).json({
                exito: false,
                mensaje: "No se creo la oportunidad",
                error
            });
        });

    oportunidadInit = JSON.parse(oportunidadInit);
    contactoInit = JSON.parse(contactoInit);
    let relacion = {
        data: {
            "relationships": {
                "contacts": {
                    "data": [{
                        "type": "contact",
                        "id": contactoInit.data.id
                    }, ]
                }
            }
        }
    };

    let url = process.env.url + 'opportunities/' + oportunidadInit.data.id + '/contacts';

    console.log(url);
    request({
        method: 'POST',
        url: url,
        headers: req.headers,
        body: JSON.stringify(relacion)
    }, (error, response, body) => {

        if (error) {
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno",
            });
        }

        res.json({
            exito: true,
            mensaje: "Oportunidad Ligada"
        });

    });

});
app.get('/', [getToken], (req, res) => {
    let token = req.token;
    let url = process.env.URL + 'contacts';

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

function crearOportunidad(headers, nameOportunidad) {
    return new Promise((resolve, reject) => {

        let url = process.env.URL + 'opportunities';
        let oportunidad = Oportunidad.Oportunidad;
        oportunidad.data.attributes.name = nameOportunidad;
        request({
            method: 'POST',
            url: url,
            headers: headers,
            body: JSON.stringify(oportunidad)
        }, (error, response, body) => {
            if (error) {
                reject(body);
            } else {
                console.log("Response Oportunidad", body);
                resolve(body);
            }

        });


    });
}

function crearContacto(headers, body) {

    return new Promise((resolve, reject) => {

        let url = process.env.URL + 'contacts';
        let contacto = Contacto.Contacto;

        contacto.data.attributes.first_name = body.nombre;
        contacto.data.attributes.last_name = body.apellido;
        contacto.data.attributes.email = body.email;
        contacto.data.attributes.phone = body.phone;
        contacto.data.relationships.company.data.id = "1365534";

        request({
            method: 'POST',
            url: url,
            headers: headers,
            body: JSON.stringify(contacto)
        }, (error, response, body) => {
            if (error) {
                reject(body);
            } else {
                console.log("Response Contacto", body);
                resolve(body);
            }

        });


    });
}
module.exports = app;