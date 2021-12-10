const ethers = require('ethers');
const {WalletDTO} = require("../infrastructure/wallet/walletDTO");
const {WalletAlreadyExistsError} = require("../exceptions");
const accounts = [];

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async userId => {
  const count = await WalletDTO.count({
    where: {userId: userId}
  })
  if(count > 0){
    throw(new WalletAlreadyExistsError())
  }

  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  return WalletDTO.create({
    userId: userId,
    address: wallet.address,
    privateKey: wallet.privateKey,
  });
};

const getWalletsData = () => () => {
  return accounts;
};

const getWalletData = () => index => {
  return accounts[index - 1];
};

const getWallet = ({}) => index => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new ethers.Wallet(accounts[index - 1].privateKey, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
