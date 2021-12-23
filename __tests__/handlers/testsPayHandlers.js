const { WalletNotFoundError} = require("../../src/exceptions");


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
  describe('Test createDepositHandler', () => {
    it('Should return deposit and payment', async () => {
      const mockedGetWalletFromId = jest.fn(() => {
        return {};
      });
      const mockedGetDeployerWallet = jest.fn(() => {
        return {};
      });
      const mockedDeposit = jest.fn(() => {
        return {};
      });
      const mockedPay = jest.fn(() => {
        return {};
      });
      const mockedAddTransactionFromTx = jest.fn(() => {
        return {hash: "hash"};
      });
      const mockedServices = jest.fn(() => {
        return {
          walletService: {getWalletFromId: mockedGetWalletFromId, getDeployerWallet: mockedGetDeployerWallet},
          contractInteraction: {deposit: mockedDeposit, pay: mockedPay},
          transactionService: {addTransactionFromTx: mockedAddTransactionFromTx}
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });
      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'POST',
        url: '/payments/deposit',
        body: {senderId: "matiti", receiverId: "nico", "amountInEthers": "0.01"}
      })

      expect(JSON.parse(r.body)).toStrictEqual({deposit: {hash: "hash"}, payment: {hash: "hash"}});
    });

    it('Should return error', async () => {
      const mockedGetWalletFromId = jest.fn(() => {
        throw new WalletNotFoundError();
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {getWalletFromId: mockedGetWalletFromId},
          contractInteraction: {},
          transactionService: {}
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });
      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'POST',
        url: '/payments/deposit',
        body: {senderId: "matiti", receiverId: "nico", "amountInEthers": "0.01"}
      })

      expect(r.body).toStrictEqual((new WalletNotFoundError()).message);
    });
  });

  describe('Test createPaymentHandler', () => {
    it('Should return payments', async () => {
      const mockedGetWalletFromId = jest.fn(() => {
        return {};
      });
      const mockedGetDeployerWallet = jest.fn(() => {
        return {};
      });
      const mockedPay = jest.fn(() => {
        return {};
      });
      const mockedAddTransactionFromTx = jest.fn(() => {
        return {hash: "hash"};
      });
      const mockedServices = jest.fn(() => {
        return {
          walletService: {getWalletFromId: mockedGetWalletFromId, getDeployerWallet: mockedGetDeployerWallet},
          contractInteraction: { pay: mockedPay},
          transactionService: {addTransactionFromTx: mockedAddTransactionFromTx}
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });
      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'POST',
        url: '/payments/pay',
        body: [{receiverId: "nico", "amountInEthers": "0.01"}, {receiverId: "nico", "amountInEthers": "0.01"}]
      })

      expect(JSON.parse(r.body)).toStrictEqual([{hash: "hash"}, {hash: "hash"}]);
    });

    it('Should return error', async () => {
      const mockedGetWalletFromId = jest.fn(() => {
        throw new WalletNotFoundError();
      });
      const mockedGetDeployerWallet = jest.fn(() => {
        return {};
      });
      const mockedServices = jest.fn(() => {
        return {
          walletService: {getWalletFromId: mockedGetWalletFromId, getDeployerWallet: mockedGetDeployerWallet},
          contractInteraction: {},
          transactionService: {}
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });
      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'POST',
        url: '/payments/pay',
        body: [{receiverId: "nico", "amountInEthers": "0.01"}, {receiverId: "nico", "amountInEthers": "0.01"}]
      })
      jest.mock("axios");

      expect(r.body).toStrictEqual((new WalletNotFoundError()).message);
    });
  });
});
