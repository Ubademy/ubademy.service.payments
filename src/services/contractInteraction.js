const ethers = require("ethers");
const {TransactionDTO} = require("../infrastructure/transaction/transactionDTO");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposit = ({ config }) => async (senderWallet, amountToSend, senderId) => {
  const basicPayments = await getContract(config, senderWallet);
  const value = await ethers.utils.parseEther(amountToSend).toHexString();
  const tx = await basicPayments.deposit({
    value: value,
  });
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {

        await TransactionDTO.create(
          {
            hash: tx.hash,
            senderId: senderId,
            senderAddress: firstEvent.args.sender,
            receiverId: "-",
            receiverAddress: config.contractAddress,
            amountInEthers: ethers.utils.formatEther(firstEvent.args.amount),
          });
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};

const pay = ({ config }) => async (receiverWallet, ubademyWallet, amountToSend, receiverId) => {
  const basicPayments = await getContract(config, ubademyWallet);
  const value = await ethers.utils.parseEther(amountToSend).toHexString();

  const tx = await basicPayments.sendPayment(receiverWallet.address, value);
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "PaymentMade") {

        await TransactionDTO.create(
          {
            hash: tx.hash,
            senderId: "-",
            senderAddress: config.contractAddress,
            receiverId: receiverId,
            receiverAddress: receiverWallet.address,
            amountInEthers: ethers.utils.formatEther(firstEvent.args.amount),
          });
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );

  return tx;
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  pay: pay(dependencies),
});
