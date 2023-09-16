const TransactionEntity = require('../../transaction.entity');

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
    console.log(sut.toJSON());
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
});
