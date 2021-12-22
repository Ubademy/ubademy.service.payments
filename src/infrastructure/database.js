const { Sequelize } = require('sequelize');

let options = {}
if(process.env.SSL_REQUIRED){
  options = {dialect: "postgres",
    dialectOptions: {
    ssl: {
      require: true,
        rejectUnauthorized: false,
      },
    },
  }
}


let sequelize;

try {
  sequelize = new Sequelize(process.env.DATABASE_URL, options);
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  sequelize = null;
  console.error('Unable to connect to the database:', error);
}


module.exports = {sequelize}
