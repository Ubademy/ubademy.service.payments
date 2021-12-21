const {PaginatedTransactionsReadModel} = require("../models/transaction");

function schema() {
  return {
    tags: ['transactions'],
    summary: "Get transactions",
    query: {
      limit: { type: "string", },
      offset: { type: "string", },
    },
    responses: {
      200: PaginatedTransactionsReadModel,
    },
  };
}

function handler({ transactionService }) {
  return async function (req, reply) {
    const body = await transactionService.getTransactions({limit: req.query["limit"], offset: req.query["offset"]});
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
