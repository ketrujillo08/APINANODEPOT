const express = require("express");
const bodyParser = require("body-parser");
require("./config/config");

const fs = require('fs');
const https = require('https');
const app = express();

//ROutes
const APP_ROUTES = require('./routes/app');
const CONTACT_ROUTES = require('./routes/contact');
const USER_ROUTES = require('./routes/users');

var privateKey = fs.readFileSync('./uploads/ssl/bed91_e2fa7_6f137a825b9bd088ab84326d121668ce.key', 'utf8');
var certificate = fs.readFileSync('./uploads/ssl/api_nanodepot_com_bed91_e2fa7_1562170680_934172786e59131e53768f65f9592a63.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS ');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/contacto', CONTACT_ROUTES);
app.use('/users', USER_ROUTES);
app.use('/', APP_ROUTES);

//var httpsServer = https.createServer(credentials, app);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Escuchando en puerto: " + process.env.PORT);
});