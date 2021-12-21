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
    let w;
    let tx;
    let transactions = [];
    const ubademyWallet = await walletService.getDeployerWallet();
    for(let key in req.body.payments){
      console.log(key + ": " + req.body.payments[key]);
      w = await walletService.getWalletFromId(key);
      tx= await contractInteraction.pay(w, ubademyWallet, req.body.payments[key]);
      transactions.push(await transactionService.addTransactionFromTx(tx, req.body.receiverId));
    }
    return transactions;
  };
}

module.exports = { schema, handler };
