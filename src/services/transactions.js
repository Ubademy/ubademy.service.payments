const {TransactionDTO} = require("../infrastructure/transaction/transactionDTO");
const {TransactionNotFoundError} = require("../exceptions");


const getTransactions = () => async ({limit, offset}) => {
  return {
    transactions: await TransactionDTO.findAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
    }),
    count: await TransactionDTO.count(),
  };
}

const getTransactionReceipt = ({}) => async depositTxHash => {
  const t = await TransactionDTO.findOne({where: {hash: depositTxHash}});
  if(t === null){
    throw(new TransactionNotFoundError());
  }
  return t;
};

module.exports = ({config}) => ({
  getTransactions: getTransactions({config}),
  getTransactionReceipt: getTransactionReceipt({config}),
})
