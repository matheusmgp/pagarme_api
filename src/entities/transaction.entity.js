const BaseEntity = require('./base.entity');

class TransactionEntity extends BaseEntity {
  constructor(price, description, payment_method, owner_name, card_expires_date, cvv) {
    super();
    this.price = price;
    this.description = description;
    this.payment_method = payment_method;
    this.owner_name = owner_name;
    this.card_expires_date = card_expires_date;
    this.cvv = cvv;
  }
}

module.exports = TransactionEntity;
