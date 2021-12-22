

describe('Tests', () => {

  beforeEach(async () => {
    //jest.resetModules();
  });

  describe('root', () => {
    it('Test 1', () => {
      jest.mock('../src/services/sum', () => {
        return {sum: jest.fn(() => 42 ),};
      });
      jest.mock("../src/infrastructure/wallet/walletDTO", () => {
          return jest.fn(() => {
            return "hola";
          })
      });
      const walletService = require("../src/services/wallets")({});
      const w = walletService.getWalletData("matiti");
      console.log(w);
      expect(w).toBe({"userId": "matiti",});
    });
  });
});
