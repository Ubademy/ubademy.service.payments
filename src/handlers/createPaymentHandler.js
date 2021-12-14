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

function handler({ contractInteraction , walletService}) {
  return async function (req) {
    const walletdto = await walletService.getWalletData(req.body.receiverId);
    const w = await walletService.getWallet(walletdto.privateKey);
    const ubademyWallet = await walletService.getDeployerWallet();
    return contractInteraction.pay(w, ubademyWallet, req.body.amountInEthers, req.body.receiverId);
  };
}

module.exports = { schema, handler };
