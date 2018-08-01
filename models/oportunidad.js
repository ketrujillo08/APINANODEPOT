const Oportunidad = {
    data: {
        attributes: {
            name: "",
            amount: "0"
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
            }
        }
    }

}

module.exports = {
    Oportunidad
};