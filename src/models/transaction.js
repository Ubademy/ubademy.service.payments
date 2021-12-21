
const TransactionReadModel = {
  type: 'object',
  properties: {
    hash: { type: 'string' },
    userId: { type: 'string' },
    senderAddress: { type: 'string' },
    receiverAddress: { type: 'string' },
    amountInEthers: { type: 'string' },
    createdAt: { type: 'string' },
  },
}

const PaginatedTransactionsReadModel = {
  type: "object",
  properties: {
    transactions: {
      type: "array",
      items: TransactionReadModel,
    },
    count: { type: "number", },
  }
}

const DepPayTransactionReadModel = {
  type: 'object',
  properties: {
    deposit: TransactionReadModel,
    payment: TransactionReadModel,
  },
}

const DepositCreateModel = {
  type: 'object',
  properties: {
    senderId: { type: 'string' },
    receiverId: { type: 'string' },
    amountInEthers: { type: 'string' },
  },
  required: ["senderId", "amountInEthers"],
}

const PaymentCreateModel = {
  type: 'object',
  properties: {
    receiverId: { type: 'string' },
    amountInEthers: { type: 'string' },
  },
  required: ["receiverId", "amountInEthers"],
}


module.exports = {
  DepPayTransactionReadModel: DepPayTransactionReadModel,
  TransactionReadModel: TransactionReadModel,
  PaginatedTransactionsReadModel: PaginatedTransactionsReadModel,
  DepositCreateModel: DepositCreateModel,
  PaymentCreateModel: PaymentCreateModel,
}
