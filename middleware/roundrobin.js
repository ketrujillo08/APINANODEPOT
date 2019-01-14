//const request = require('request');
sorteo = (req, res, next) => {
    let bearer = "bearer " + req.token;
    let headers = {
        'Accept': 'application/vnd.api+json',
        'Authorization': bearer,
        'Content-Type': 'application/vnd.api+json'
    }

    req.headers = headers;

    if (req.body.anuncio == 'usa-AG') {
        req.roundrobin = 24378;
        next();
    }

    const users = [
        { user: 23433, count: 0 },
        { user: 23437, count: 0 },
        { user: 23438, count: 0 },
        { user: 23439, count: 0 },
        { user: 23440, count: 0 },
        { user: 23453, count: 0 }
    ];
    req.roundrobin = calcularMin(users).user;
    next();
}

function calcularMin(arreglo) {

    let random = Math.round(Math.random() * 5);
    //console.log(random);
    return arreglo[random];

    /*let pos = 0;
    let valor = arreglo[0].count;
    for (let index = 0; index < arreglo.length; index++) {
        if (index != arreglo.length - 1) {
            if (valor > arreglo[index + 1].count) {
                pos = index
            }
        }
    }
    return arreglo[pos];*/

}
module.exports = {
    sorteo
}