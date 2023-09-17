const BaseEntity = require('./base.entity');

class TransactionEntity extends BaseEntity {
  constructor(price, description, payment_method, card_number, owner_name, card_expires_date, cvv) {
    super();
    this.price = price;
    this.description = description;
    this.payment_method = payment_method;
    this.card_number = card_number;
    this.owner_name = owner_name;
    this.card_expires_date = card_expires_date;
    this.cvv = cvv;
  }
  toJSON() {
    return {
      price: this.price,
      description: this.description,
      payment_method: this.payment_method,
      card_number: this.maskCardNumber(),
      owner_name: this.owner_name,
      card_expires_date: this.card_expires_date,
      cvv: this.cvv,
    };
  }
  maskCardNumber() {
    return '*'.repeat(this.card_number.length - 4) + this.card_number.slice(-4);
  }
  static createEntity = (props) => {
    return new TransactionEntity(
      props.price,
      props.description,
      props.payment_method,
      props.card_number,
      props.owner_name,
      props.card_expires_date,
      props.cvv
    );
  };
}
module.exports = { TransactionEntity };
