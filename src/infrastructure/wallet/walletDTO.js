const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../database");


class WalletDTO extends Model {}
WalletDTO.init({
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  address: DataTypes.STRING,
  privateKey: DataTypes.STRING,
}, {sequelize, modelName: 'Wallet' , tableName: 'Wallets'});

WalletDTO.sync({ alter: true });

module.exports = {WalletDTO}
