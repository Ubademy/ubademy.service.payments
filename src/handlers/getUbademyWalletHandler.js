function schema() {
  return {
    tags: ['wallets'],
    summary: "Get contract's wallet",
    response: {
      200: {
        type: 'object',
        properties: {
          address: {type: "string"},
          balance: {type: "string"},
        },
      },
    },
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    try {
      const body = await walletService.getUbademyWalletData();
      reply.code(200).send(body);
    }catch(e){
      reply.code(500);
      console.log(e.message);
      return reply.send(e.message);
    }
  };
}

module.exports = { handler, schema };
