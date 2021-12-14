const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getTransaction = require("./handlers/getTransactionHandler");
const getTransactions = require("./handlers/getTransactionsHandler")

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/wallet/:userId",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
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

function getTransactionRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/transaction/:txHash",
    schema: getTransaction.schema(config),
    handler: getTransaction.handler({ config, ...services }),
  };
}

function getTransactionsRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payments/transaction",
    schema: getTransactions.schema(config),
    handler: getTransactions.handler({ config, ...services }),
  };
}

module.exports = [getWalletDataRoute, getWalletsDataRoute, createWalletRoute, createDepositRoute, getTransactionRoute, getTransactionsRoute];
