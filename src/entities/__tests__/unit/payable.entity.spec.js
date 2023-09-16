const PayableEntity = require('../../payable.entity');

describe('PayableEntity unit tests', () => {
  let sut;
  let expires_date = new Date();
  beforeEach(() => {
    sut = new PayableEntity(1, 5.0, new Date(expires_date.getTime() + 150), 'paid ', 'available');
  });

  it('toJSON  method', () => {
    expect(sut.toJSON()).toStrictEqual({
      transaction_id: 1,
      fee: 5,
      payment_date: expect.any(Date),
      status: 'paid ',
      availability: 'available',
    });
  });
});
