const ethers = require('ethers');
const {WalletDTO} = require("../infrastructure/wallet/walletDTO");
const {WalletAlreadyExistsError, WalletNotFoundError} = require("../exceptions");
const accounts = [];

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async userId => {
  const existingWallet = await WalletDTO.findOne({where: {userId: userId}})
  if(existingWallet !== null){
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

const getWalletData = () => async userId => {
  const w = await WalletDTO.findOne({where: {userId: userId}});
  if(w === null){
    throw(new WalletNotFoundError());
  }
  /*
  console.log(w)
  console.log(w.address)
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const balance = await provider.getBalance(w.address);
  console.log(balance)
  */
  return w;
};

const getWallet = ({}) => privateKey => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new ethers.Wallet(privateKey, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
