# ubademy.service.payments
[![codecov](https://codecov.io/gh/Ubademy/ubademy.service.courses/branch/master/graph/badge.svg?token=WOM0ZAP02J)](https://codecov.io/gh/Ubademy/ubademy.service.courses) [![Tests](https://github.com/Ubademy/ubademy.service.courses/actions/workflows/test.yml/badge.svg)](https://github.com/Ubademy/ubademy.service.courses/actions/workflows/test.yml) [![Linters](https://github.com/Ubademy/ubademy.service.courses/actions/workflows/linters.yml/badge.svg)](https://github.com/Ubademy/ubademy.service.courses/actions/workflows/linters.yml) [![Deploy](https://github.com/Ubademy/ubademy.service.courses/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ubademy/ubademy.service.courses/actions/workflows/deploy.yml)

Payments microservice for [Ubademy](https://ubademy.github.io/)

This service manages:
* SmartContract deployment in kovan network
* Transactions from the smart contract
* Managing user wallets


For further information visit [Ubademy Payments](https://ubademy.github.io/services/payments)

Deployed at: [ubademy-service-payments](https://ubademy-service-payments.herokuapp.com/docs#) :rocket:



### Technologies

* [Fastify](https://www.fastify.io/)
* [SQLAlchemy](https://sequelize.org/): PostgreSQL Database
* [npm](https://www.npmjs.com/)
* [ethers.js](https://docs.ethers.io/v5/)
* [Infura](https://infura.io/)
* [Docker](https://www.docker.com/)
* [Heroku](https://www.heroku.com/)

### Architecture

Directory structure (based on [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)):

```tree
Yet to be written...
```

## Installation

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
