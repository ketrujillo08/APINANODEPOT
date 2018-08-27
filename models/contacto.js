const Contacto = {
    data: {
        attributes: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            custom: {
                anuncio: "",
                telefono: "",
                leadsource: "",
                empresa_negocio: ""
            }

        },
        relationships: {
            company: {
                data: {
                    id: "",
                    type: "company"
                }
            },
            user: {
                data: {
                    id: 0,
                    type: "user"
                }
            }
        }
    }
}


module.exports = {
    Contacto
};