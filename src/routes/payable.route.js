const { Router } = require('express');
const PayableController = require('../controllers/payable/payable.controller');

const routePayable = Router();
const _controller = PayableController;

routePayable.get('/api/v1/dev/payable', _controller.getAll);
routePayable.get('/api/v1/dev/payable/info', _controller.getAllInfo);

module.exports = routePayable;
