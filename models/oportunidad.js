const Oportunidad = {
    data: {
        attributes: {
            name: "",
            amount: "0",
            custom: {
                horario: "",
                anuncio: "",
                lead_source: ""

            }
        },
        relationships: {
            company: {
                data: {
                    type: "company",
                    id: 1365534
                }
            },
            pipeline: {
                data: {
                    type: "pipeline",
                    id: "5187"
                }
            },
            opportunity_stage: {
                data: {
                    type: "opportunity_stage",
                    id: 46443
                }
            },
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
    Oportunidad
};