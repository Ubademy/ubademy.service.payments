const {WalletAlreadyExistsError} = require("../exceptions");
const {WalletReadModel} = require("../models/wallet");


function schema() {
  return {
    tags: ['wallets'],
    summary: "Create wallet",
    query: {
      userId: { type: "string"},
    },
    response: {
      200: WalletReadModel,
      409: {
        type: 'null',
        description: WalletAlreadyExistsError.message
      },
    },
    required: ["userId"],
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
      return reply.send(e.message);
    }
  };
}

module.exports = { handler, schema };
