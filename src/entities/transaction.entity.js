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
}
/*const teste = new TransactionEntity(10.0, 'TESTE TESTE', 'debit_card', '1234567891425', 'matheus', '10/10/2022', '123');
console.log(teste.toJSON());*/
module.exports = TransactionEntity;
