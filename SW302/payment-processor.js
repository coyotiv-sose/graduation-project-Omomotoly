const AnalyticsManager = require('./analytics-manager')
const eventBus = require('./event-bus')

module.exports = class PaymentProcessor {
  pay(user, product) {
    if (user.balance < product.price) {
      AnalyticsManager.track('payment unsucessful')

      throw new Error('insufficient funds')
    }

    user.balance -= product.price
    AnalyticsManager.track('payment successful')
    return product.price
  }
}
