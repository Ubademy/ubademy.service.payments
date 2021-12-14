const {TransactionDTO} = require("../infrastructure/transaction/transactionDTO");


const getTransactions = () => async () => {
  return await TransactionDTO.findAll();
}

module.exports = ({config}) => ({
  getTransactions: getTransactions({config}),
})
