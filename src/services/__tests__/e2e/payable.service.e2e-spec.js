const { TransactionEntity } = require('../../../entities/transaction.entity');
const PrismaService = require('../../prisma/prisma.service');
const app = require('../../../index');
const request = require('supertest');
const CardEnum = require('../../../utils/card.enum');
const { PayableEntity } = require('../../../entities/payable.entity');
describe('Transaction e2e tests', () => {
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
  it('should return the payables with available = 1000', async () => {
    await PrismaService.payable.create({
      data: { ...entity, amount: 97, status: 'paid', availability: 'available' },
    });
    const response = await request(app).get('/api/v1/dev/payable');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: { available: 97, waiting_funds: 0 },
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should return the payables with waiting_funds = 1000', async () => {
    await PrismaService.payable.create({
      data: { ...entity, amount: 95, status: 'waiting_funds', availability: 'waiting_funds' },
    });
    const response = await request(app).get('/api/v1/dev/payable');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: { available: 0, waiting_funds: 95 },
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should return the payables info with waiting_funds = 1000', async () => {
    await PrismaService.payable.create({
      data: { ...entity, amount: 95, status: 'waiting_funds', availability: 'waiting_funds' },
    });
    const response = await request(app).get('/api/v1/dev/payable/info');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: [
        {
          id: expect.any(Number),
          transaction_id: expect.any(Number),
          amount: 95,
          payment_date: expect.any(String),
          status: 'waiting_funds',
          availability: 'waiting_funds',
        },
      ],
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should return the payables info with available = 1000', async () => {
    await PrismaService.payable.create({
      data: { ...entity, amount: 97, status: 'paid', availability: 'available' },
    });
    const response = await request(app).get('/api/v1/dev/payable/info');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: [
        {
          id: expect.any(Number),
          transaction_id: expect.any(Number),
          amount: 97,
          payment_date: expect.any(String),
          status: 'paid',
          availability: 'available',
        },
      ],
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
});
