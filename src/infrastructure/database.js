const { Sequelize} = require('sequelize');

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

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


module.exports = {sequelize}
