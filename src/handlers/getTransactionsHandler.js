function schema() {
  return {
    params: {},
  };
}

function handler({ transactionService }) {
  return async function (req, reply) {
    const body = await transactionService.getTransactions();
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
