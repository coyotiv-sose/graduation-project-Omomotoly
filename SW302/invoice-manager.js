class Invoice {
  payment = null
  user = null

  constructor(payment, user) {
    this.payment = payment
    this.user = user
  }
}

module.exports = class InvoiceManager {
  issueInvoice(payment, user) {
    return new Invoice(payment, user)
  }
}
