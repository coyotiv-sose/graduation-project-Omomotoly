const Order = require('./order')
const AnalyticsManager = require('./analytics-manager')
const eventBus = require('./event-bus')

module.exports = class User {
  orders = []
  balance = 0

  buy(paymentProcessor, inventory, invoiceManager, product) {
    eventBus.emit('buy')

    AnalyticsManager.track('buying started')
    const payment = paymentProcessor.pay(this, product)
    inventory.removeProduct(product)
    const invoice = invoiceManager.issueInvoice(payment, this)
    const order = new Order(product, invoice)

    this.orders.push(order)
    AnalyticsManager.track('buying finished')
    return order
  }

  addBalnce(amount) {
    this.balance += amount
  }
}
