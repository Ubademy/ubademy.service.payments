const {WalletNotFoundError, WalletAlreadyExistsError} = require("../../src/exceptions");

describe('Test Wallet handlers', () => {

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

  describe('Test getWalletHandler', () => {
    it('Should return not found', async () => {

      const mockedGetWalletData = jest.fn(() => {
        throw new WalletNotFoundError();
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {getWalletData: mockedGetWalletData},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'GET',
        url: '/payments/wallet/'
      })

      expect(r.body).toStrictEqual((new WalletNotFoundError()).message);
    });

    it('Should return wallet', async () => {

      const mockedGetWalletData = jest.fn(() => {
        return { address: "address", userId: "user1"};
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {getWalletData: mockedGetWalletData},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'GET',
        url: '/payments/wallet/'
      })

      expect(JSON.parse(r.body)).toStrictEqual({ address: "address", userId: "user1"});
    });
  });

  describe('Test getUbademyWalletHandler', () => {
    it('Should return error', async () => {

      const mockedGetUbademyWalletData = jest.fn(() => {
        throw new Error();
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {getUbademyWalletData: mockedGetUbademyWalletData},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'GET',
        url: '/payments/wallet'
      })

      expect(r.statusCode).toStrictEqual(500);
    });

    it('Should return wallet', async () => {

      const mockedGetUbademyWalletData = jest.fn(() => {
        return { address: "address", balance: "2.8"};
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {getUbademyWalletData: mockedGetUbademyWalletData},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'GET',
        url: '/payments/wallet'
      })

      expect(r.statusCode).toStrictEqual(200);
      expect(JSON.parse(r.body)).toStrictEqual({ address: "address", balance: "2.8"});
    });
  });

  describe('Test createWalletHandler', () => {
    it('Should return error', async () => {

      const mockedCreateWallet = jest.fn(() => {
        throw new WalletAlreadyExistsError();
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {createWallet: mockedCreateWallet},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });

      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'POST',
        url: '/payments/wallet'
      })
2
      expect(r.body).toStrictEqual((new WalletAlreadyExistsError()).message);
    });

    it('Should return wallet', async () => {

      const mockedCreateWallet = jest.fn(() => {
        return { address: "address", balance: "2.8"};
      });

      const mockedServices = jest.fn(() => {
        return {
          walletService: {createWallet: mockedCreateWallet},
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });
      
      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: 'POST',
        url: '/payments/wallet'
      })

      expect(r.statusCode).toStrictEqual(200);
      expect(JSON.parse(r.body)).toStrictEqual({ address: "address", balance: "2.8"});
    });
  });

});
