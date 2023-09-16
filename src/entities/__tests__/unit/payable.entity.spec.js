const { PayableEntity, payableEntityFactory } = require('../../payable.entity');

describe('PayableEntity unit tests', () => {
  let sut;
  let expires_date = new Date();
  beforeEach(() => {
    sut = new PayableEntity(1, 5.0, new Date(expires_date.getTime() + 150), 'paid ', 'available');
  });

  it('toJSON  method', () => {
    expect(sut.toJSON()).toStrictEqual({
      transaction_id: 1,
      amount: 5,
      payment_date: expect.any(Date),
      status: 'paid ',
      availability: 'available',
    });
  });
  it('should return a instance of PayableEntity', () => {
    const result = payableEntityFactory({
      transaction_id: 100,
      amount: 5,
      payment_date: new Date(),
      status: 'waiting_funds',
      availability: 'waiting_funds',
    });
    expect(result).toBeInstanceOf(PayableEntity);
    expect(result.transaction_id).toEqual(100);
    expect(result.amount).toEqual(5);
    expect(result.status).toEqual('waiting_funds');
    expect(result.availability).toEqual('waiting_funds');
    expect(result.payment_date).toBeInstanceOf(Date);
  });
});
