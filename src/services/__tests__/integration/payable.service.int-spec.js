const { TransactionEntity } = require('../../../entities/transaction.entity');
const PayableService = require('../../payable/payable.service');
const PrismaService = require('../../prisma/prisma.service');
const CardEnum = require('../../../utils/card.enum');
const { PayableEntity } = require('../../../entities/payable.entity');
describe('Payable integration tests', () => {
  let expires_date = new Date();
  let entity;
  let transactionEntity;
  let transaction_id;
  beforeAll(() => {
    transactionEntity = TransactionEntity.createEntity({
      price: 100.0,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '12345678910',
      owner_name: 'matheus',
      card_expires_date: new Date(expires_date.getTime() + 150),
      cvv: 855,
    });
  });
  beforeEach(async () => {
    const transaction = await PrismaService.transaction.create({
      data: { ...transactionEntity, cvv: parseInt(transactionEntity.cvv.toString()) },
    });
    transaction_id = transaction.id;
    entity = PayableEntity.createEntity({
      transaction_id: transaction_id,
      amount: 100,
      payment_date: new Date(),
      status: 'paid',
      availability: 'available',
    });
  });
  afterEach(async () => {
    await PrismaService.payable.deleteMany();
    await PrismaService.transaction.deleteMany();
  });
  it('should create a  Payable', async () => {
    const payable = await PayableService.create(entity);
    expect(payable).toStrictEqual({
      id: expect.any(Number),
      transaction_id: expect.any(Number),
      amount: 100,
      availability: 'available',

      payment_date: expect.any(Date),
      status: 'paid',
    });
  });
  it('should return the payables with available = 1000', async () => {
    await PrismaService.payable.create({
      data: { ...entity, amount: 1000, status: 'paid', availability: 'available' },
    });
    const payables = await PayableService.getAll();
    expect(payables).toStrictEqual({
      available: 1000,
      waiting_funds: 0,
    });
  });
  it('should return the payables with waiting_funds = 1000', async () => {
    await PrismaService.payable.create({
      data: { ...entity, amount: 1000, status: 'waiting_funds', availability: 'waiting_funds' },
    });
    const payables = await PayableService.getAll();
    expect(payables).toStrictEqual({
      available: 0,
      waiting_funds: 1000,
    });
  });
  it('should return the payables info', async () => {
    await PrismaService.payable.create({
      data: entity,
    });
    const payables = await PayableService.getAllInfo();
    expect(payables).toStrictEqual([
      {
        id: expect.any(Number),
        transaction_id: transaction_id,
        amount: 100,
        availability: 'available',
        payment_date: expect.any(Date),
        status: 'paid',
      },
    ]);
  });
});
