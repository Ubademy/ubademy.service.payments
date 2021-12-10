class WalletAlreadyExistsError extends Error{
  constructor() {
    super();
    this.message = "The user you specified has a wallet already."
  }
}

module.exports = {WalletAlreadyExistsError}
