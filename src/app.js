const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");


const fastify = require("fastify")({ logger: true });

fastify.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'payments',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://ubademy.github.io/',
      description: 'Find more info here'
    },
    host: process.env.PORT? "localhost":"127.0.0.1:8000",
    schemes: [process.env.PORT?'https':'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'wallets'},
      { name: 'transactions', description: 'Payments and deposits' },
      { name: 'metrics'}
    ],
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true
})

routes.forEach(route => fastify.route(route({ config, services })));

module.exports = fastify
