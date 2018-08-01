const request = require('request');
sorteo = (req, res, next) => {
    let bearer = "bearer " + req.token;
    let headers = {
        'Accept': 'application/vnd.api+json',
        'Authorization': bearer,
        'Content-Type': 'application/vnd.api+json'
    }

    req.headers = headers;

    let url = process.env.URL + 'contacts?sort=-created_at&page%5Bsize%5D=100';

    let users = [
        { user: 23433, count: 0 },
        { user: 23437, count: 0 },
        { user: 23438, count: 0 },
        { user: 23439, count: 0 },
        { user: 23440, count: 0 },
        { user: 23453, count: 0 }
    ];

    request({
        method: 'GET',
        url: url,
        headers
    }, (error, response, body) => {

        body = JSON.parse(body);

        if (error) {
            return res.status(500).json({
                exito: false,
                error
            });
        }
        body.data.forEach(contact => {
            users.forEach(user => {
                if (contact.relationships.user.data.id == user.user) {
                    user.count += 1;
                }
            });
        });



    });

    req.roundrobin = calcularMin(users).user;
    next();
}

function calcularMin(arreglo) {

    let pos = 0;
    let valor = arreglo[0].count;
    for (let index = 0; index < arreglo.length; index++) {

        if (index != arreglo.length - 1) {
            if (valor > arreglo[index + 1].count) {
                pos = index
            }
        }
    }
    return arreglo[pos];

}
module.exports = {
    sorteo
}