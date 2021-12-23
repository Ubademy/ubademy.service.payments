

describe('Test Wallet Service', () => {

  beforeEach(async () => {
    jest.resetModules();
  });

  describe('Test getWalletData', () => {
    it('Should return wallet', async () => {

      const mockedFindOne = jest.fn(() => {
        return {address: "abc", dataValues: {userId: "matiti", address: "abc"}}
      });
      jest.mock('../../src/infrastructure/wallet/walletDTO', () => {
        return {WalletDTO: {findOne: mockedFindOne}}
      });
      const mockedGetBalance = jest.fn(() => {
        return "0"
      });
      const mockedProvider = jest.fn(() => {
        return {getBalance: mockedGetBalance}
      });
      const mockedFormatEther = jest.fn(() => {
        return "0"
      });
      jest.mock("ethers", () => {
        return {providers: {InfuraProvider: mockedProvider}, utils: {formatEther: mockedFormatEther}}
      });

      const walletService = require("../../src/services/wallets")({});
      const w = await walletService.getWalletData("matiti");
      expect(w).toStrictEqual({userId: "matiti", address: "abc", balance: "0"});
    });
  });

  describe('Test createWallet', () => {
    it('Should create and return wallet', async () => {

      const mockedFindOne = jest.fn(() => {
        return null;
      });
      const mockedCreate = jest.fn(() => {
        return {userId: "matiti", address: "abc", balance: "0"};
      });
      jest.mock('../../src/infrastructure/wallet/walletDTO', () => {
        return { WalletDTO: {findOne: mockedFindOne, create: mockedCreate}}
      });
      const mockedProvider = jest.fn(() => {
        return null;
      });
      const mockedConnect = jest.fn(() => {
        return {wallet: {address: "abc", privateKey: "key"}}
      });
      const mockedCreateRandom = jest.fn(() => {
        return {connect: mockedConnect}
      });
      jest.mock("ethers", () => {
        return { providers: {InfuraProvider: mockedProvider}, Wallet: {createRandom: mockedCreateRandom}}
      });
      const walletService = require("../../src/services/wallets")({});
      const w = await walletService.createWallet("matiti");
      expect(w).toStrictEqual({userId: "matiti", address: "abc", balance: "0"});
    });
  });

  describe('Test getDeployerWallet', () => {
    it('Should return deployer wallet', async () => {

      const mockedProvider = jest.fn(() => {
        return null;
      });
      const mockedConnect = jest.fn(() => {
        return {address: "abc", balance: "0"}
      });
      const mockedFromMnemonic = jest.fn(() => {
        return {connect: mockedConnect}
      });
      jest.mock("ethers", () => {
        return { providers: {InfuraProvider: mockedProvider}, Wallet: {fromMnemonic: mockedFromMnemonic}}
      });
      const config = {deployerMnemonic: "mnemonic", network: "kovan", infuraApiKey: "key"};

      const walletService = require("../../src/services/wallets")({config});
      const w = await walletService.getDeployerWallet();
      expect(w).toStrictEqual({address: "abc", balance: "0"});
    });
  });

  describe('Test getWallet', () => {
    it('Should return wallet', async () => {

      const mockedProvider = jest.fn(() => {
        return null;
      });
      const mockedWallet = jest.fn(() => {
        return {address: "abc", balance: "0"};
      });

      jest.mock("ethers", () => {
        return { providers: {InfuraProvider: mockedProvider}, Wallet: mockedWallet}
      });
      const config = {deployerMnemonic: "mnemonic", network: "kovan", infuraApiKey: "key"};

      const walletService = require("../../src/services/wallets")({config});
      const w = await walletService.getWallet("key");
      expect(w).toStrictEqual({address: "abc", balance: "0"});
    });
  });

  describe('Test getUbademyWalletData', () => {
    it('Should return ubademy wallet', async () => {


      const mockedGetBalance = jest.fn(() => {
        return "0"
      });
      const mockedProvider = jest.fn(() => {
        return {getBalance: mockedGetBalance}
      });
      const mockedFormatEther = jest.fn(() => {
        return "0"
      });

      jest.mock("ethers", () => {
        return {providers: {InfuraProvider: mockedProvider}, utils: {formatEther: mockedFormatEther}}
      });

      const config = {deployerMnemonic: "mnemonic", network: "kovan", infuraApiKey: "key", contractAddress: "address"};
      const walletService = require("../../src/services/wallets")({config});
      const w = await walletService.getUbademyWalletData();
      expect(w).toStrictEqual({address: "address", balance: "0"});
    });
  });

  describe('Test getWalletFromId', () => {
    it('Should return null when id is undefined', async () => {
      const walletService = require("../../src/services/wallets")({});
      const w = await walletService.getWalletFromId(undefined);
      expect(w).toStrictEqual(null);
    });
  });

});
