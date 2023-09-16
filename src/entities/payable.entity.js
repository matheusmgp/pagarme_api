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

  toJSON() {
    return {
      transaction_id: this.transaction_id,
      fee: this.fee,
      payment_date: this.payment_date,
      status: this.status,
      availability: this.availability,
    };
  }
}

/*const teste = new PayableEntity('456465', 1212.12, '10/10/2024', 'paid', 'available ');
console.log(teste.toJSON());*/
module.exports = PayableEntity;
