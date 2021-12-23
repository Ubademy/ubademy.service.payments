describe('Test Transactions Service', () => {

  beforeEach(async () => {
    jest.resetModules();
  });

  describe('Test getTransactionReceipt', () => {
    it('Should return trasaction', async () => {

      const mockedFindOne = jest.fn(() => {
        return {hash: "hash", senderId: "matiti", amountInEthers: "1"}
      });
      jest.mock('../../src/infrastructure/transaction/transactionDTO', () => {
        return {TransactionDTO: {findOne: mockedFindOne}}
      });

      const transactionService = require("../../src/services/transactions")({});
      const t = await transactionService.getTransactionReceipt("hash");
      expect(t).toStrictEqual({hash: "hash", senderId: "matiti", amountInEthers: "1"});
    });

    it('Should throw TransactionNotFoundError', async () => {

      const mockedFindOne = jest.fn(() => {
        return null
      });
      jest.mock('../../src/infrastructure/transaction/transactionDTO', () => {
        return {TransactionDTO: {findOne: mockedFindOne}}
      });

      const transactionService = require("../../src/services/transactions")({});

      await expect(transactionService.getTransactionReceipt("hash")).rejects.toThrow();
    });
  });

  describe('Test getTransactions', () => {
    it('Should return Transactions', async () => {

      const mockedFindAll = jest.fn(() => {
        return [{hash: "hash", senderId: "matiti", amountInEthers: "1"}]
      });
      const mockedCount = jest.fn(() => {
        return 1
      });
      jest.mock('../../src/infrastructure/transaction/transactionDTO', () => {
        return {TransactionDTO: {findAll: mockedFindAll, count: mockedCount}}
      });

      const transactionService = require("../../src/services/transactions")({});
      const t = await transactionService.getTransactions({limit: 1, offset: 0});
      expect(t.transactions).toStrictEqual([{hash: "hash", senderId: "matiti", amountInEthers: "1"}]);
      expect(t.count).toStrictEqual(1);
    });
  });

  describe('Test addTransactionFromTx', () => {
    it('Should return Transactions', async () => {

      const mockedCreate = jest.fn(() => {
        return {hash: "hash", senderId: "matiti", amountInEthers: "1"}
      });

      jest.mock('../../src/infrastructure/transaction/transactionDTO', () => {
        return {TransactionDTO: {create: mockedCreate}}
      });

      const transactionService = require("../../src/services/transactions")({});
      const tx = {hash: "hash", to: "ubademy", from: "matiti", amount: "1"}
      const t = await transactionService.addTransactionFromTx(tx, "matiti");
      expect(t).toStrictEqual({hash: "hash", senderId: "matiti", amountInEthers: "1"});
    });
  });


});
