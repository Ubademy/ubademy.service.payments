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
        return reply.code(403).send(e.message);
      }
      console.log(e.message);
      return reply.code(500).send("Internal server error");
    }
  };
}

module.exports = { handler, schema };
