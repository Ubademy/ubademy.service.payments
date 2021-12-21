const MetricsReadModel = {
  type: "object",
  properties: {
    year: {type: "number"},
    depositCount: {type: "array", items: {type: "number"}, minItems: 12,},
    depositEthFlow: {type: "array", items: {type: "number"}, minItems: 12,},
    paymentCount: {type: "array", items: {type: "number"}, minItems: 12,},
    paymentEthFlow: {type: "array", items: {type: "number"}, minItems: 12,},
  },
}

module.exports = {
  MetricsReadModel: MetricsReadModel,
}
