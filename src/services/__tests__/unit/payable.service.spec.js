const PayableService = require('../../payable/payable.service');

describe('PayableService unit tests', () => {
  it('should return the sum', () => {
    let amount_ = PayableService.reduce([
      {
        amount: 1,
      },
      {
        amount: 1,
      },
      {
        amount: 1,
      },
    ]);
    expect(amount_).toStrictEqual(3);
    amount_ = PayableService.reduce([
      {
        amount: 10,
      },
      {
        amount: 10,
      },
      {
        amount: 10,
      },
    ]);
    expect(amount_).toStrictEqual(30);
    amount_ = PayableService.reduce([
      {
        amount: 1032,
      },
      {
        amount: 1430,
      },
      {
        amount: 155550,
      },
    ]);
    expect(amount_).toStrictEqual(158012);
    amount_ = PayableService.reduce([
      {
        amount: 100000,
      },
      {
        amount: 100000,
      },
      {
        amount: 100000,
      },
    ]);
    expect(amount_).toStrictEqual(300000);
  });
  it('should return the number rounded', () => {
    let amount_ = PayableService.roundNumber(10.0);
    expect(amount_).toStrictEqual(10);
    amount_ = PayableService.roundNumber(10.015);
    expect(amount_).toStrictEqual(10.02);
    amount_ = PayableService.roundNumber(10.15222);
    expect(amount_).toStrictEqual(10.15);
    amount_ = PayableService.roundNumber(10);
    expect(amount_).toStrictEqual(10);
    amount_ = PayableService.roundNumber(867552.4481);
    expect(amount_).toStrictEqual(867552.45);
    amount_ = PayableService.roundNumber(321687.3432);
    expect(amount_).toStrictEqual(321687.34);
  });
});
