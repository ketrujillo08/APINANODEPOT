const express = require('express');
//ROutes
const APP_ROUTES = require('./app');
const CONTACT_ROUTES = require('./contact');
const USER_ROUTES = require('./users');
const MAILCHIMP_ROUTES = require('./mailchimp');
const ZAPIER_ROUTES = require('./zapier')

const app = express();

app.use('/contacto', CONTACT_ROUTES);
app.use('/mailchimp', MAILCHIMP_ROUTES);
app.use('/users', USER_ROUTES);
app.use('/zapier', ZAPIER_ROUTES);
app.use('/', APP_ROUTES);

module.exports = app;