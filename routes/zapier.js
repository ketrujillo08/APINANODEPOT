'use strict';
var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var fs = require('fs');
var handlebars = require("handlebars")
const { getZapierToken } = require('../middleware/auth');


app.post("/", getZapierToken, (req, res) => {
    let nombre = req.query.nombre;
    let email = req.query.email;
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            name: 'server.nanodepot.com',
            host: 'server.nanodepot.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'ecommerce@nanodepot.mx', // generated ethereal user
                pass: 'H[}R=za2.1*7' // generated ethereal password
            }
        });
        readHTMLFile('./assets/templates/perdidasEshop.html', (e, html) => {
            if (e) {
                return res.status(500).json({
                    success: false,
                    error: e
                });
            }
            var template = handlebars.compile(html);

            var htmlToSend = template();
            let mailOptions = {
                from: '"Ecommerce Nanodepot" <ecommerce@nanodepot.mx>', // sender address
                to: email, // list of receivers
                subject: nombre + ' ' + ' adquiere productos nanotecnológicos aun super precio', // Subject line
                html: htmlToSend // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                console.log(error);
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Error al enviar correo",
                        error: error
                    });
                }
                console.log('Message sent: %s', info.messageId);
                return res.status(200).json({
                    success: true,
                    message: "Correo enviado con exito",
                    info: info
                });

            });
        });

    });

});
var readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

module.exports = app;