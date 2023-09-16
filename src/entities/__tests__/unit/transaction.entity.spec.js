const { TransactionEntity, transactionEntityFactory } = require('../../transaction.entity');

describe('TransactionEntity unit tests', () => {
  let sut;

  let expires_date = new Date();
  beforeEach(() => {
    sut = new TransactionEntity(
      1.0,
      'Smartband XYZ 3.0',
      'debit_card',
      '12345678910',
      'matheus',
      new Date(expires_date.getTime() + 150),
      '855'
    );
  });

  it('toJSON  method', () => {
    expect(sut.toJSON()).toStrictEqual({
      price: 1,
      description: 'Smartband XYZ 3.0',
      payment_method: 'debit_card',
      card_number: '*******8910',
      owner_name: 'matheus',
      card_expires_date: expect.any(Date),
      cvv: '855',
    });
  });
  it('maskCardNumber  method', () => {
    expect(sut.maskCardNumber()).toStrictEqual('*******8910');
  });
  it('should return a instance of TransactionEntity', () => {
    const result = transactionEntityFactory({
      price: 100,
      description: 'description',
      payment_method: 'debit_card',
      card_number: '132231321',
      owner_name: 'matheus',
      card_expires_date: new Date(),
      cvv: 123,
    });
    expect(result).toBeInstanceOf(TransactionEntity);
    expect(result.price).toEqual(100);
    expect(result.description).toEqual('description');
    expect(result.payment_method).toEqual('debit_card');
    expect(result.card_number).toEqual('132231321');
    expect(result.owner_name).toEqual('matheus');
    expect(result.card_expires_date).toBeInstanceOf(Date);
    expect(result.cvv).toEqual(123);
  });
});
