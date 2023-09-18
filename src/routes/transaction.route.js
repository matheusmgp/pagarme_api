const { Router } = require('express');
const TransactionController = require('../controllers/transaction/transaction.controller');
const createTransactionSchema = require('../validators/create-transaction.validator');

const routeTransaction = Router();
const _controller = TransactionController;

routeTransaction.get('/api/v1/dev/transaction', _controller.getAll);
routeTransaction.post('/api/v1/dev/transaction', createTransactionSchema, _controller.create);

module.exports = routeTransaction;
