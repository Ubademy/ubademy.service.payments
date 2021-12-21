const {TransactionNotFoundError} = require("../exceptions");
const {TransactionReadModel} = require("../models/transaction");

function schema() {
  return {
    tags: ['transactions'],
    summary: "Get transaction",
    params: {
      hash: { type: "string", },
    },
    required: ["hash"],
    responses: {
      200: {
        type: TransactionReadModel,
      },
      404: {
        type: 'null',
        description: TransactionNotFoundError.message
      },
    },
  };
}

function handler({ transactionService }) {
  return async function (req, reply) {
    try{
      const body = await transactionService.getTransactionReceipt(req.params.hash);
      reply.code(200).send(body);
    }catch(e){
      if(e instanceof TransactionNotFoundError){
        reply.code(404);
      }else{
        reply.code(500);
      }
      console.log(e.message);
      return reply.send(e.message);
    }
  };
}

module.exports = { handler, schema };
