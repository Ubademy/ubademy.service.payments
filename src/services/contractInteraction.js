const ethers = require("ethers");
const {TransactionDTO} = require("../infrastructure/transaction/transactionDTO");
const {TransactionNotFoundError} = require("../exceptions");

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

const getTransactionReceipt = ({}) => async depositTxHash => {
  const t = await TransactionDTO.findOne({where: {hash: depositTxHash}});
  if(t === null){
    throw(new TransactionNotFoundError());
  }
  return t;
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getTransactionReceipt: getTransactionReceipt(dependencies),
});
