class WalletAlreadyExistsError extends Error{
  constructor() {
    super();
    this.message = "The user you specified has a wallet already."
  }
}

class WalletNotFoundError extends Error{
  constructor() {
    super();
    this.message = "The user you specified does not have a wallet."
  }
}

module.exports = {WalletAlreadyExistsError, WalletNotFoundError}
