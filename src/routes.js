const getWalletData = require("./handlers/getWalletHandler");
const getUbademyWalletData = require("./handlers/getUbademyWalletHandler")
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const createPayment = require("./handlers/createPaymentHandler");
const getTransaction = require("./handlers/getTransactionHandler");
const getTransactions = require("./handlers/getTransactionsHandler")
const getTransactionMetrics = require("./handlers/getTransactionMetricsHandler")

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/wallet/:userId",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getUbademyWalletDataRoute({services, config}) {
  return {
    method: "GET",
    url: "/payments/wallet",
    schema: getUbademyWalletData.schema(config),
    handler: getUbademyWalletData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payments/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payments/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function createPaymentRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payments/pay",
    schema: createPayment.schema(config),
    handler: createPayment.handler({ config, ...services }),
  };
}

function getTransactionRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/transactions/:hash",
    schema: getTransaction.schema(config),
    handler: getTransaction.handler({ config, ...services }),
  };
}

function getTransactionsRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/transactions",
    schema: getTransactions.schema(config),
    handler: getTransactions.handler({ config, ...services }),
  };
}

function getTransactionMetricsRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/metrics/transactions",
    schema: getTransactionMetrics.schema(config),
    handler: getTransactionMetrics.handler({ config, ...services }),
  };
}

module.exports = [getWalletDataRoute, createWalletRoute, createDepositRoute, createPaymentRoute, getTransactionRoute, getTransactionsRoute, getUbademyWalletDataRoute, getTransactionMetricsRoute];
