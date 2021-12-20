function schema() {
  return {
    params: {},
  };
}

function handler({ transactionService, metricsService }) {
  return async function (req, reply) {
    const transactions = await transactionService.getTransactions({limit: null, offset: 0});
    const metrics = await metricsService.buildMetrics({transactions: transactions.transactions, year: parseInt(req.query["year"])});
    return reply.code(200).send(metrics);
  };
}

module.exports = { handler, schema };
