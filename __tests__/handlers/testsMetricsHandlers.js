
describe('Test Metrics handlers', () => {

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
  describe('Test getTransactionMetricsHandler', () => {
    it('Should return metrics', async () => {
      const emptyMonths = Array(12).fill(0);
      const emptyMetrics = {
        "depositCount": emptyMonths,
        "depositEthFlow": emptyMonths,
        "paymentCount": emptyMonths,
        "paymentEthFlow": emptyMonths,
        "year": 0
      };
      const mockedBuildMetrics = jest.fn(() => {
        return emptyMetrics;
      });
      const mockedGetTransactions = jest.fn(() => {
        return {};
      });

      const mockedServices = jest.fn(() => {
        return {
          metricsService: {buildMetrics: mockedBuildMetrics},
          transactionService: {getTransactions: mockedGetTransactions}
        }
      });
      jest.mock('../../src/services/services', () => {
        return mockedServices;
      });
      const fastify = require("../../src/app");
      const r = await fastify.inject({
        method: "GET",
        url: "/payments/metrics/transactions",
      })

      expect(JSON.parse(r.body)).toStrictEqual(emptyMetrics);
    });
  });
});
