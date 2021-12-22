const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../database");


class TransactionDTO extends Model {}
TransactionDTO.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  hash: DataTypes.STRING,
  userId: DataTypes.STRING,
  senderAddress: DataTypes.STRING,
  receiverAddress: DataTypes.STRING,
  amountInEthers: DataTypes.STRING,
}, {sequelize, modelName: 'Deposit' , tableName: 'Deposits', timestamps: true,  updatedAt: false});

TransactionDTO.sync({ alter: true });

module.exports = {TransactionDTO}
