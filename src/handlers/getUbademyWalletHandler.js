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
      const body = await walletService.getUbademyWalletData();
      reply.code(200).send(body);
    }catch(e){
      reply.code(500);
      console.log(e.message);
      throw e;
    }
  };
}

module.exports = { handler, schema };
