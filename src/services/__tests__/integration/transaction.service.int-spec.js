const { transactionEntityFactory } = require('../../../entities/transaction.entity');
const TransactionService = require('../../transaction/transaction.service');
const PayableService = require('../../payable/payable.service');
const PrismaService = require('../../prisma/prisma.service');
describe('TransactionEntity integration tests', () => {
  let expires_date = new Date();
  let entity;
  beforeAll(() => {
    entity = transactionEntityFactory({
      price: 100.0,
      description: 'Smartband XYZ 3.0',
      payment_method: 'debit_card',
      card_number: '12345678910',
      owner_name: 'matheus',
      card_expires_date: new Date(expires_date.getTime() + 150),
      cvv: 855,
    });
  });
  afterEach(async () => {
    await PrismaService.payable.deleteMany();
    await PrismaService.transaction.deleteMany();
  });
  it('should create a Transaction and Payable ', async () => {
    const transaction = await TransactionService.create(entity);
    expect(transaction).toStrictEqual({
      id: expect.any(Number),
      price: 100,
      description: 'Smartband XYZ 3.0',
      payment_method: 'debit_card',
      card_number: '*******8910',
      owner_name: 'matheus',
      card_expires_date: expect.any(Date),
      cvv: 855,
    });
  });
  it('should set 5% of fee when using credit_card', async () => {
    await TransactionService.create({ ...entity, payment_method: 'credit_card' });
    const payable = await PayableService.getAll();
    expect(payable).toStrictEqual({ available: 0, waiting_funds: 95 });
  });
  it('should set 3% of fee when using debit_card', async () => {
    await TransactionService.create({ ...entity, payment_method: 'debit_card' });
    const payable = await PayableService.getAll();
    expect(payable).toStrictEqual({ available: 97, waiting_funds: 0 });
  });
});
