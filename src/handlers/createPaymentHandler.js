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

function handler({ contractInteraction , walletService, transactionService}) {
  return async function (req) {
    const w = await walletService.getWalletFromId(req.body.receiverId);
    const ubademyWallet = await walletService.getDeployerWallet();
    const tx = await contractInteraction.pay(w, ubademyWallet, req.body.amountInEthers);
    return await transactionService.addTransactionFromTx(tx, req.body.receiverId);
  };
}

module.exports = { schema, handler };
