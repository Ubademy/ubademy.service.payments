const ethers = require("ethers");
const {TransactionNotCreated} = require("../exceptions");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const transactionError = (error) => {
  const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
  const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
  console.error("reasons List");
  console.error(reasonsList);

  console.error("message");
  console.error(message);
}

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const value = (await ethers.utils.parseEther(amountToSend)).toHexString();
  const tx = await basicPayments.deposit({value: value});
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        console.log("Deposit created");
        amount = ethers.utils.formatEther(firstEvent.args.amount);
      } else {
        console.error(`Deposit not created in tx ${tx.hash}`);
      }
    },
    error => transactionError(error),
  );

  if (tx["statusCode"] === 500) {
    throw TransactionNotCreated;
  }

  return {...tx, amount: amountToSend};
};

const pay = ({ config }) => async (receiverWallet, ubademyWallet, amountToSend) => {
  const basicPayments = await getContract(config, ubademyWallet);
  const value = (await ethers.utils.parseEther(amountToSend)).toHexString();
  const tx = await basicPayments.sendPayment(receiverWallet.address, value);
  let amount = -1;
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "PaymentMade") {
        console.log("Payment created");
        amount = ethers.utils.formatEther(firstEvent.args.amount);
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => transactionError(error),
  );

  if (tx["statusCode"] === 500) {
    throw TransactionNotCreated;
  }

  tx.from = config.contractAddress;
  tx.to = receiverWallet.address;
  return {...tx, amount: amountToSend};
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  pay: pay(dependencies),
});
