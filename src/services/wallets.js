const ethers = require('ethers');
const {WalletDTO} = require("../infrastructure/wallet/walletDTO");
const {WalletAlreadyExistsError, WalletNotFoundError} = require("../exceptions");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic.replace(/_/g, " ")).connect(provider);
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

const getWalletData = () => async userId => {
  const w = await WalletDTO.findOne({where: {userId: userId}});
  if(w === null){
    throw(new WalletNotFoundError());
  }

  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const balance = await provider.getBalance(w.address);
  return {...w["dataValues"], balance: ethers.utils.formatEther(balance)};
};

const getWallet = ({}) => async privateKey => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new ethers.Wallet(privateKey, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
