function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    const walletdto = await walletService.getWalletData(req.body.senderId)
    const w = await walletService.getWallet(walletdto.privateKey)
    return contractInteraction.deposit(w, req.body.amountInEthers);
  };
}

module.exports = { schema, handler };
