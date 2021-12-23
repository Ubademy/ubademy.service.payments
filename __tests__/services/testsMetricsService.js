describe('Test Metrics Service', () => {

  describe('Test buildMetrics', () => {
    it('Should return empty metrics', async () => {

      const config = {contractAddress: "Eevivi's contract"};
      const metricsService = require("../../src/services/metrics")({config});
      const m = await metricsService.buildMetrics({transactions: [], year: null});
      const emptyMonths = Array(12).fill(0);
      const empty = {"depositCount": emptyMonths, "depositEthFlow": emptyMonths, "paymentCount": emptyMonths, "paymentEthFlow": emptyMonths, "year": null}

      expect(m).toStrictEqual(empty);
    });

    it('Should return unfiltered metrics', async () => {
      const transaction1 = {
        "id": "2e9e3eb1-af88-44f0-94c2-5ab3f59a2b0a",
        "hash": "0x2ae135aab8e82f92bd366c545a2628507d435eb669a8a5fef7b62adb13938a3d",
        "userId": "Vxe5q7PjCuPsnpGHyhafOG7FO7j2",
        "senderAddress": "0x3697F42Cfe5058d34b64BE7E0F69914f8affa5d9",
        "receiverAddress": "Eevivi's contract",
        "amountInEthers": "0.01",
        "createdAt": "2021-12-23T06:25:50.183Z"
      };
      const transaction2 = {
        "id": "2e9e3eb1-af88-44f0-94c2-5ab3f59a2b0a",
        "hash": "0x2ae135aab8e82f92bd366c545a2628507d435eb669a8a5fef7b62adb13938a3d",
        "userId": "Vxe5q7PjCuPsnpGHyhafOG7FO7j2",
        "senderAddress": "Eevivi's contract",
        "receiverAddress": "0x42EA1Ae4dd6288f8307a281AaBe64cA01EeAF6Bf",
        "amountInEthers": "0.02",
        "createdAt": "2021-12-23T06:25:50.183Z"
      };
      const t1 = {"dataValues": transaction1};
      const t2 = {"dataValues": transaction2};
      const config = {contractAddress: "Eevivi's contract"};
      const metricsService = require("../../src/services/metrics")({config});
      const m = await metricsService.buildMetrics({transactions: [t1, t2], year: 2021});
      let depositEthFlow = Array(12).fill(0);
      depositEthFlow[11] = 0.01;
      let paymentEthFlow = Array(12).fill(0);
      paymentEthFlow[11] = 0.02
      let counts = Array(12).fill(0);
      counts[11] = 1;
      const empty = {"depositCount": counts, "depositEthFlow": depositEthFlow, "paymentCount": counts, "paymentEthFlow": paymentEthFlow, "year": 2021}

      expect(m).toStrictEqual(empty);
    });

  });
});
