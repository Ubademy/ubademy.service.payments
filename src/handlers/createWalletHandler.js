const {WalletAlreadyExistsError} = require("../exceptions");

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
    console.log(req.query)
    try{
      const body = await walletService.createWallet(req.query["userId"]);
      return reply.code(200).send(body);
    }catch(e){
      if(e instanceof WalletAlreadyExistsError){
        reply.code(409);
      }else{
        reply.code(500);
      }
      console.log(e.message);
      throw e;
    }
  };
}

module.exports = { handler, schema };
