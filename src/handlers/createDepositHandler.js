const {WalletNotFoundError} = require("../exceptions");
const {DepPayTransactionReadModel, DepositCreateModel} = require("../models/transaction");

function schema() {
  return {
    tags: ['transactions'],
    summary: "Create deposit",
    body: DepositCreateModel,
    responses: {
      200: DepPayTransactionReadModel,
      404: {
        type: 'null',
        description: WalletNotFoundError.message
      },
    },
  };
}

function handler({ contractInteraction, walletService , transactionService}) {
  return async function (req, reply) {
    try {

      const wSender = await walletService.getWalletFromId(req.body.senderId);
      const wReceiver = await walletService.getWalletFromId(req.body.receiverId);
      const ubademyWallet = await walletService.getDeployerWallet();

      const txDeposit = await contractInteraction.deposit(wSender, req.body.amountInEthers);
      const deposit = await transactionService.addTransactionFromTx(txDeposit, req.body.senderId);

      if (wReceiver === null) {
        return reply.code(200).send({deposit: deposit, payment: null});
      }

      const commission = process.env.COMMISSION || 0.85;
      const amountToPay = (parseFloat(req.body.amountInEthers)*commission).toString();
      console.log(amountToPay);
      const txPayment = await contractInteraction.pay(wReceiver, ubademyWallet, amountToPay);
      const payment = await transactionService.addTransactionFromTx(txPayment, req.body.receiverId);

      return reply.code(200).send({deposit: deposit, payment: payment});

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

module.exports = { schema, handler };
