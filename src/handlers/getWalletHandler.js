const {WalletNotFoundError} = require("../exceptions");
const {WalletReadModel} = require("../models/wallet");


function schema() {
  return {
    tags: ['wallets'],
    summary: "Get wallet",
    params: {
      userId: { type: "string"},
    },
    response: {
      200: WalletReadModel,
      404: {
        type: 'null',
        description: WalletNotFoundError.message
      },
    },
    required: ["userId"],
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
      return reply.send(e.message);
    }
  };
}

module.exports = { handler, schema };
