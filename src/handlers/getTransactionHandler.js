const {TransactionNotFoundError} = require("../exceptions");

function schema() {
  return {
    params: {
      type: "object",
      properties: {
        txHash: {
          type: "string",
        },
      },
    },
    required: ["txHash"],
  };
}

function handler({ transactionService }) {
  return async function (req, reply) {
    try{
      const body = await transactionService.getTransactionReceipt(req.params.txHash);
      reply.code(200).send(body);
    }catch(e){
      if(e instanceof TransactionNotFoundError){
        reply.code(404);
      }else{
        reply.code(500);
      }
      console.log(e.message);
      throw e;
    }
  };
}

module.exports = { handler, schema };
