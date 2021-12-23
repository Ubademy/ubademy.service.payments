# ubademy.service.payments
[![Tests](https://github.com/Ubademy/ubademy.service.payments/actions/workflows/test.yml/badge.svg)](https://github.com/Ubademy/ubademy.service.payments/actions/workflows/test.yml) [![Deploy](https://github.com/Ubademy/ubademy.service.payments/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ubademy/ubademy.service.payments/actions/workflows/deploy.yml)

Payments microservice for [Ubademy](https://ubademy.github.io/)

This service manages:
* SmartContract deployment in kovan network
* User Wallets
* Transactions from the SmartContract


For further information visit [Ubademy Payments](https://ubademy.github.io/services/payments)

Deployed at: [ubademy-service-payments](https://ubademy-service-payments.herokuapp.com/docs#) :rocket:



### Technologies

* [Fastify](https://www.fastify.io/)
* [Sequelize](https://sequelize.org/): PostgreSQL Database
* [npm](https://www.npmjs.com/)
* [ethers.js](https://docs.ethers.io/v5/)
* [Infura](https://infura.io/)
* [Docker](https://www.docker.com/)
* [Heroku](https://www.heroku.com/)

### Architecture

Directory structure (based on [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)):

```tree
├── contracts
│   └── BasicPayments.sol
├── deployments
│   └── kovan
├── src
│   ├── handlers
│   │   ├── createDepositHandler.js
│   │   ├── createPaymentHandler.js
│   │   ├── createWalletHandler.js
│   │   ├── getTransactionHandler.js
│   │   ├── getTransactionMetricsHandler.js
│   │   ├── getTransactionsHandler.js
│   │   ├── getUbademyWalletHandler.js
│   │   └── getWalletHandler.js
│   ├── infrastructure
│   │   ├── transaction
│   │   │   └── transactionDTO.js
│   │   ├── wallet
│   │   │   └── walletDTO.js
│   │   └── database.js
│   ├── models
│   │   ├── metrics.js
│   │   ├── transactions.js
│   │   └── wallet.js
│   ├── services
│   │   ├── contractInteraction.js
│   │   ├── metrics.js
│   │   ├── services.js
│   │   ├── transactions.js
│   │   └── wallets.js
│   ├── app.js
│   ├── config.js
│   ├── exceptions.js
│   ├── routes.js
│   └── server.js
└── __tests__
```

## Installation

### .env
Make sure you add a .env file in the project's root directory.
It should include the following variables:

```
MNEMONIC=your_mnemonic_separated_with_spaces
INFURA_API_KEY=selfExplanatory
COMMISSION=<payment-commission>
MICROSERVICES=<microservices-dict>
```

* payment-commission: float between 0 and 1
* microservices-dict: {microservice-name: microservice-url}


### Dependencies:
* [npm](https://www.npmjs.com/) 6.14.15
* [nvm](https://www.docker.com/) Use node v14.18.1
* [Docker-Compose](https://docs.docker.com/compose/)




Once you have installed these tools, npm will take care of the rest :relieved:

``` bash
npm i
```

## Usage

### Run the API locally
``` bash
make run
```

### Reset Database and then run locally
``` bash
make reset
```

### Run tests
``` bash
npm test
```

### Access API Swagger
Once the API is running you can check all available endpoints at [http://127.0.0.1:8000/docs#/](http://127.0.0.1:8000/docs#/)
