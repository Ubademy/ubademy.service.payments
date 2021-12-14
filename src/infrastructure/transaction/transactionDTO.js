const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../database");


class TransactionDTO extends Model {}
TransactionDTO.init({
  hash: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  senderId: DataTypes.STRING,
  senderAddress: DataTypes.STRING,
  receiverId: DataTypes.STRING,
  receiverAddress: DataTypes.STRING,
  amountInEthers: DataTypes.STRING,
}, {sequelize, modelName: 'Deposit' , tableName: 'Deposits'});

TransactionDTO.sync({ alter: true });

module.exports = {TransactionDTO}
