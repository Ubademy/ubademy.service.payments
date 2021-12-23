const {PaymentCreateModel, TransactionReadModel} = require("../models/transaction");
const {WalletNotFoundError} = require("../exceptions");

function schema() {
  return {
    tags: ['transactions'],
    summary: "Create payment",
    body: {
      type: "array",
      items: PaymentCreateModel,
    },
    responses: {
      200: {
        type: "array",
        items: TransactionReadModel,
      },
      404: {
        type: 'null',
        description: WalletNotFoundError.message
      },
    },
  };
}

function handler({ contractInteraction , walletService, transactionService}) {
  return async function (req, reply) {
    try{
      const transactions = [];
      const ubademyWallet = await walletService.getDeployerWallet();
      console.log(req.body);
      for await (const i of req.body) {
        console.log(i);
        transactions.push(
          await transactionService.addTransactionFromTx(
            await contractInteraction.pay(
              await walletService.getWalletFromId(i["receiverId"]
              ), ubademyWallet, i["amountInEthers"]
            ), i["receiverId"]
          )
        );
      }

      return reply.code(200).send(transactions);
    }catch(e){
      if(e instanceof WalletNotFoundError){
        reply.code(404);
      }else{
        reply.code(500);
      }
      const users = []
      for(const i of req.body){
        users.push(i["receiverId"])
      }
      const axios = require("axios");
      axios.post(
        JSON.parse(process.env.MICROSERVICES)["notifications"] + "notifications/error-report",
        {
          "usersToNotify": users,
          "errorMessage": "Reimbursements failed when cancelling course. Please contact an Administrator.",
        }
      );

      console.log(e.message);
      return reply.send(e.message);
    }
  };
}

module.exports = { schema, handler };
