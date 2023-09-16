const BaseEntity = require('./base.entity');

class PayableEntity extends BaseEntity {
  constructor(transaction_id, fee, payment_date, status, availability) {
    super();
    this.transaction_id = transaction_id;
    this.fee = fee;
    this.payment_date = payment_date;
    this.status = status;
    this.availability = availability;
  }
}

module.exports = PayableEntity;
