class WalletAlreadyExistsError extends Error{
  constructor() {
    super();
    this.message = "The user you specified has a wallet already.";
  }
}

class WalletNotFoundError extends Error{
  constructor() {
    super();
    this.message = "The user you specified does not have a wallet.";
  }
}

class TransactionNotFoundError extends Error{
  constructor() {
    super();
    this.message = "The hash you specified does not have a transaction associated.";
  }
}

class TransactionNotCreated extends Error{
  constructor() {
    super();
    this.message = "Transaction not created.";
  }
}

module.exports = {WalletAlreadyExistsError, WalletNotFoundError, TransactionNotFoundError, TransactionNotCreated}
