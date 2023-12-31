const { TransactionEntity } = require('../../transaction.entity');
const CardEnum = require('../../../utils/card.enum');
describe('TransactionEntity unit tests', () => {
  let sut;
  let expires_date = new Date();
  beforeEach(() => {
    sut = TransactionEntity.createEntity({
      price: 1.0,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '12345678910',
      owner_name: 'matheus',
      card_expires_date: new Date(expires_date.getTime() + 150),
      cvv: '855',
    });
  });
  it('toJSON  method', () => {
    expect(sut.toJSON()).toStrictEqual({
      price: 1,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '*******8910',
      owner_name: 'matheus',
      card_expires_date: expect.any(Date),
      cvv: '855',
    });
  });
  it('maskCardNumber  method', () => {
    expect(sut.card_number).toStrictEqual('*******8910');
  });
  it('should return a instance of TransactionEntity', () => {
    const result = TransactionEntity.createEntity({
      price: 100,
      description: 'description',
      payment_method: CardEnum.DEBIT,
      card_number: '*****1321',
      owner_name: 'matheus',
      card_expires_date: new Date(),
      cvv: 123,
    });
    expect(result).toBeInstanceOf(TransactionEntity);
    expect(result.price).toEqual(100);
    expect(result.description).toEqual('description');
    expect(result.payment_method).toEqual(CardEnum.DEBIT);
    expect(result.card_number).toEqual('*****1321');
    expect(result.owner_name).toEqual('matheus');
    expect(result.card_expires_date).toBeInstanceOf(Date);
    expect(result.cvv).toEqual(123);
  });
});
