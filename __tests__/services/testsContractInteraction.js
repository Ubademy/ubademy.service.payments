describe('Test Contract Interaction Service', () => {

  beforeEach(async () => {
    jest.resetModules();
  });

  describe('Test deposit', () => {
    it('Should return tx', async () => {
      const mockedThen = jest.fn(() => {
        return 0;
      });
      const mockedWait = jest.fn(() => {
        return {then: mockedThen};
      });
      const mockedDeposit = jest.fn(() => {
        return {wait: mockedWait};
      });
      const mockedContract = jest.fn(() => {
        return {deposit: mockedDeposit}
      });
      const mockedToHexString = jest.fn(() => {
        return "0.1"
      });
      const mockedParseEther = jest.fn(() => {
        return {toHexString: mockedToHexString}
      });
      jest.mock("ethers", () => {
        return {Contract: mockedContract, utils: {parseEther: mockedParseEther}}
      });

      const config = {contractAbi: "abi", network: "kovan", infuraApiKey: "key", contractAddress: "address"};
      const contractInteractionService = require("../../src/services/contractInteraction")({config});
      const tx = await contractInteractionService.deposit(0, 0);
      expect(tx.amount).toStrictEqual(0);
    });

    it('Should throw TransactionNotCreated', async () => {
      const mockedThen = jest.fn(() => {
        return 0;
      });
      const mockedWait = jest.fn(() => {
        return {then: mockedThen};
      });
      const mockedDeposit = jest.fn(() => {
        return {"statusCode": 500, wait: mockedWait};
      });
      const mockedContract = jest.fn(() => {
        return {deposit: mockedDeposit}
      });
      const mockedToHexString = jest.fn(() => {
        return "0.1"
      });
      const mockedParseEther = jest.fn(() => {
        return {toHexString: mockedToHexString}
      });
      jest.mock("ethers", () => {
        return {Contract: mockedContract, utils: {parseEther: mockedParseEther}}
      });

      const config = {contractAbi: "abi", network: "kovan", infuraApiKey: "key", contractAddress: "address"};
      const contractInteractionService = require("../../src/services/contractInteraction")({config});

      await expect(contractInteractionService.deposit(0, 0)).rejects.toThrow();

    });

  });

  describe('Test payment', () => {
    it('Should throw TransactionNotCreated', async () => {

      const mockedThen = jest.fn(() => {
        return 0;
      });
      const mockedWait = jest.fn(() => {
        return {then: mockedThen};
      });
      const mockedSendPayment = jest.fn(() => {
        return {"statusCode": 500, wait: mockedWait};
      });
      const mockedContract = jest.fn(() => {
        return {sendPayment: mockedSendPayment}
      });
      const mockedToHexString = jest.fn(() => {
        return "0.1"
      });
      const mockedParseEther = jest.fn(() => {
        return {toHexString: mockedToHexString}
      });
      jest.mock("ethers", () => {
        return {Contract: mockedContract, utils: {parseEther: mockedParseEther}}
      });

      const config = {contractAbi: "abi", network: "kovan", infuraApiKey: "key", contractAddress: "address"};
      const contractInteractionService = require("../../src/services/contractInteraction")({config});
      await expect(contractInteractionService.pay({address: "address"}, 0, 0)).rejects.toThrow();
    });
    it('Should return tx', async () => {

      const mockedThen = jest.fn(() => {
        return 0;
      });
      const mockedWait = jest.fn(() => {
        return {then: mockedThen};
      });
      const mockedSendPayment = jest.fn(() => {
        return {wait: mockedWait};
      });
      const mockedContract = jest.fn(() => {
        return {sendPayment: mockedSendPayment}
      });
      const mockedToHexString = jest.fn(() => {
        return "0.1"
      });
      const mockedParseEther = jest.fn(() => {
        return {toHexString: mockedToHexString}
      });
      jest.mock("ethers", () => {
        return {Contract: mockedContract, utils: {parseEther: mockedParseEther}}
      });

      const config = {contractAbi: "abi", network: "kovan", infuraApiKey: "key", contractAddress: "address"};
      const contractInteractionService = require("../../src/services/contractInteraction")({config});
      const tx = await contractInteractionService.pay({address: "address"}, 0, 0);
      expect(tx.amount).toStrictEqual(0);
    });
  });

});
