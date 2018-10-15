const Company = {
    data: {
        attributes: {
            name: "",
            website: ""
        },
        relationships: {
            user: {
                data: {
                    type: "user",
                    id: 0
                }
            }
        }
    }
}

module.exports = {
    Company
};