const BaseEntity = require('./base.entity');

class PayableEntity extends BaseEntity {
  constructor(transaction_id, amount, payment_date, status, availability) {
    super();
    this.transaction_id = transaction_id;
    this.amount = amount;
    this.payment_date = payment_date;
    this.status = status;
    this.availability = availability;
  }

  toJSON() {
    return {
      transaction_id: this.transaction_id,
      amount: this.amount,
      payment_date: this.payment_date,
      status: this.status,
      availability: this.availability,
    };
  }
}
const payableEntityFactory = (props) => {
  return new PayableEntity(props.transaction_id, props.amount, props.payment_date, props.status, props.availability);
};
module.exports = { PayableEntity, payableEntityFactory };
