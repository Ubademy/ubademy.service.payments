const {TransactionNotFoundError} = require("../../src/exceptions");

describe('Test Transaction handlers', () => {

  beforeEach(async () => {
    jest.resetModules();
    jest.mock('../../src/config', () => {
      return {
        contractAddress: "address",
        contractAbi: "abi",
        deployerMnemonic: "mnemonic",
        infuraApiKey: "key",
        network: "network",
      }
    });
  });

  describe('Test getTransactionHandler', () => {
    it('Should return not found', async () => {

      const mockedGetTransactionReceipt = jest.fn(() => {
        throw new TransactionNotFoundError();
      });

      const mockedServices = jest.fn(() => {
        return {
          transactionService: {getTransactionReceipt: mockedGetTransactionReceipt},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: "GET",
        url: "/payments/transactions/"
      })

      expect(r.body).toStrictEqual((new TransactionNotFoundError()).message);
    });

    it('Should return transaction', async () => {

      const mockedGetTransactionReceipt = jest.fn(() => {
        return {hash: "hash", amount: "2.9"};
      });

      const mockedServices = jest.fn(() => {
        return {
          transactionService: {getTransactionReceipt: mockedGetTransactionReceipt},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: "GET",
        url: "/payments/transactions/"
      })

      expect(JSON.parse(r.body)).toStrictEqual({hash: "hash", amount: "2.9"});
    });
  });

  describe('Test getTransactionsHandler', () => {
    it('Should return transactions', async () => {

      const mockedGetTransactions = jest.fn(() => {
        return [{hash: "hash", amount: "2.9"}, {hash: "hash2", amount: "0.9"}];
      });

      const mockedServices = jest.fn(() => {
        return {
          transactionService: {getTransactions: mockedGetTransactions},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: "GET",
        url: "/payments/transactions"
      })

      expect(JSON.parse(r.body)).toStrictEqual([{hash: "hash", amount: "2.9"}, {hash: "hash2", amount: "0.9"}]);
    });
  });

});
