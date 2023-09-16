const { Router } = require('express');
const routeTransaction = require('./transaction.route');
const routePayable = require('./payable.route');
const routes = Router();

routes.use(routeTransaction);
routes.use(routePayable);

module.exports = routes;
