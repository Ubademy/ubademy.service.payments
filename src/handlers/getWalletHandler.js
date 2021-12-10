const {WalletAlreadyExistsError, WalletNotFoundError} = require("../exceptions");

function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    try {
      const body = await walletService.getWalletData(req.params.userId);
      reply.code(200).send(body);
    }catch(e){
      if(e instanceof WalletNotFoundError){
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
