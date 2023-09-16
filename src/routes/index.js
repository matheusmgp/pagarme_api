const { Router } = require('express');
const { routeTransaction } = require('./transaction.route');
const routes = Router();
routes.use(routeTransaction);
module.exports = { routes };
