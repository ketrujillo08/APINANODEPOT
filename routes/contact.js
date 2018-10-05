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
    let header = req.headers;
    let contactoInit = await crearContacto(header, body, req.roundrobin)
        .catch((error) => {
            return res.status(500).json({
                exito: false,
                mensaje: "No se creo el contacto",
                error
            });
        });
    let oportunidadInit = await crearOportunidad(header, body, req.roundrobin)
        .catch((error) => {
            return res.status(500).json({
                exito: false,
                mensaje: "No se creo la oportunidad",
                error
            });
        });

    oportunidadInit = JSON.parse(oportunidadInit);
    contactoInit = JSON.parse(contactoInit);

    console.log(oportunidadInit);

    if (contactoInit.errors) {


        return res.json({
            exito: false,
            mensaje: "El contacto ya existe",
            error: contactoInit.errors
        });
    }

    let relacion = {
        "data": {
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
                mensaje: "Error a ligar",
                url: url,
                error: JSON.stringify(error),
                body: JSON.stringify(body),
                response: response
            });
        }

        res.json({
            exito: true,
            mensaje: "Oportunidad Ligada",
            body
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

function crearOportunidad(headers, body, userid) {
    return new Promise((resolve, reject) => {
        let url = process.env.URL + 'opportunities';
        let oportunidad = Oportunidad.Oportunidad;
        oportunidad.data.attributes.name = body.nombre;
        oportunidad.data.attributes.custom.horario = body.horario;
        oportunidad.data.attributes.custom.anuncio = body.anuncio;
        oportunidad.data.attributes.custom.lead_source = body.leadsource;
        oportunidad.data.relationships.user.data.id = userid;
        request({
            method: 'POST',
            url: url,
            headers: headers,
            body: JSON.stringify(oportunidad)
        }, (error, response, body) => {
            if (error) {
                //console.log("Response Error Oportunidad", body);
                resolve(body);
            } else {
                //console.log("Response Oportunidad", body);
                resolve(body);
            }

        });


    });
}

function crearContacto(headers, body, userid) {


    return new Promise((resolve, reject) => {

        let url = process.env.URL + 'contacts';
        let contacto = Contacto.Contacto;

        contacto.data.attributes.first_name = body.nombre;
        contacto.data.attributes.last_name = body.apellido;
        contacto.data.attributes.email = body.email;
        contacto.data.attributes.phone = body.phone;
        contacto.data.relationships.company.data.id = "1365534";
        contacto.data.relationships.user.data.id = userid;
        contacto.data.attributes.custom.anuncio = body.anuncio;
        contacto.data.attributes.custom.telefono = body.phone;
        contacto.data.attributes.custom.leadsource = body.leadsource;
        contacto.data.attributes.custom.empresa_negocio = body.empresa;
        console.log("Contacto", contacto);

        request({
            method: 'POST',
            url: url,
            headers: headers,
            body: JSON.stringify(contacto)
        }, (error, response, body) => {
            if (error) {
                resolve(body);
            } else {
                //console.log("Response Contacto", body);
                resolve(body);
            }

        });


    });
}
module.exports = app;