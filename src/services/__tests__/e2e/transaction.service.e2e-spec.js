const { TransactionEntity } = require('../../../entities/transaction.entity');
const TransactionService = require('../../transaction/transaction.service');
const PrismaService = require('../../prisma/prisma.service');
const app = require('../../../index');
const request = require('supertest');
const CardEnum = require('../../../utils/card.enum');
describe('Transaction e2e tests', () => {
  let expires_date = new Date();
  let entity;
  beforeAll(() => {
    entity = TransactionEntity.createEntity({
      price: 100.0,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
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
  it('should create a Transaction and Payable', async () => {
    const response = await request(app)
      .post('/api/v1/dev/transaction')
      .send(entity)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: {
        id: expect.any(Number),
        price: 100,
        description: 'Smartband XYZ 3.0',
        payment_method: CardEnum.DEBIT,
        card_number: '*******8910',
        owner_name: 'matheus',
        card_expires_date: expect.any(String),
        cvv: 855,
      },
      timestamp: expect.any(String),
      method: 'POST',
    });
  });
  it('should set 5% of fee when using credit_card', async () => {
    await TransactionService.create({ ...entity, payment_method: CardEnum.CREDIT });
    const response = await request(app).get('/api/v1/dev/payable');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: { available: 0, waiting_funds: 95 },
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should set 3% of fee when using debit_card', async () => {
    await TransactionService.create({ ...entity, payment_method: CardEnum.DEBIT });
    const response = await request(app).get('/api/v1/dev/payable');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: { available: 97, waiting_funds: 0 },
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should return the transactions', async () => {
    await PrismaService.transaction.create({
      data: { ...entity, cvv: parseInt(entity.cvv.toString()) },
    });
    const response = await request(app).get('/api/v1/dev/transaction');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: [
        {
          id: expect.any(Number),
          price: 100,
          description: 'Smartband XYZ 3.0',
          payment_method: 'debit_card',
          card_number: '*******8910',
          owner_name: 'matheus',
          card_expires_date: expect.any(String),
          cvv: 855,
        },
      ],
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
});
