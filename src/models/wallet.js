const WalletReadModel = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    address: { type: 'string' },
    privateKey: { type: 'string' },
    createdAt: { type: 'string' },
    balance: { type: 'string' },
  },
}

module.exports = {
  WalletReadModel: WalletReadModel,
}
