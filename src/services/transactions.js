const {TransactionDTO} = require("../infrastructure/transaction/transactionDTO");
const {TransactionNotFoundError} = require("../exceptions");


const getTransactions = () => async ({limit, offset}) => {
  return {
    transactions: await TransactionDTO.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit ? limit:25,
      offset: offset ? offset*(limit ? limit:25):0,
    }),
    count: await TransactionDTO.count(),
  };
}

const getTransactionReceipt = () => async depositTxHash => {
  const t = await TransactionDTO.findOne({where: {hash: depositTxHash}});
  if(t === null){
    throw(new TransactionNotFoundError());
  }
  return t;
};

const addTransactionFromTx = () => async (tx, id) =>{
  return await TransactionDTO.create({
      hash: tx.hash,
      userId: id,
      senderAddress: tx.from,
      receiverAddress: tx.to,
      amountInEthers: tx.amount,
    });
}

module.exports = ({config}) => ({
  getTransactions: getTransactions({config}),
  getTransactionReceipt: getTransactionReceipt({config}),
  addTransactionFromTx: addTransactionFromTx({config})
})
