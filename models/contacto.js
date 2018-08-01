const Contacto = {
    data: {
        attributes: {
            first_name: "",
            last_name: "",
            email: "",
            phone: ""

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