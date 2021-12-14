const {TransactionDTO} = require("../infrastructure/transaction/transactionDTO");
const {TransactionNotFoundError} = require("../exceptions");


const getTransactions = () => async () => {
  return await TransactionDTO.findAll();
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
