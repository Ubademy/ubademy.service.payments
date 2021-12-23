const ethers = require("ethers");
const {TransactionNotCreated} = require("../exceptions");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const handleReceipt = (receipt, type) => {
  console.log("Transaction mined");
  const firstEvent = receipt && receipt.events && receipt.events[0];
  if (firstEvent && firstEvent.event == type+"Made") {
    console.log(type + " created");
  }
}

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const value = (await ethers.utils.parseEther(amountToSend)).toHexString();
  const tx = await basicPayments.deposit({value: value});
  tx.wait(1).then(
    async receipt => handleReceipt(receipt, "Deposit"),
    error => console.log(error),
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
  await tx.wait(1).then(
    async receipt => handleReceipt(receipt, "Payment"),
    error => console.log(error),
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
