const walletService = require("./wallets");
const contractInteraction = require("./contractInteraction");
const transactionService = require("./transactions");
const metricsService = require("./metrics")

module.exports = ({ config }) => ({
  walletService: walletService({ config }),
  contractInteraction: contractInteraction({ config }),
  transactionService: transactionService({config}),
  metricsService: metricsService({config}),
});
