const Inventory = require('./inventory')
const User = require('./user')
const PaymentProcessor = require('./payment-processor')
const Product = require('./product')
const InvoiceManager = require('./invoice-manager')
const LogisticsManager = require('./logistics-manager')
const Delivery = require('./delivery')
const AnalyticsManager = require('./analytics-manager')
const eventBus = require('./event-bus')

eventBus.on('buy', () => {
  console.log('buy event received')
})

const inventory = new Inventory()
const paymentProcessor = new PaymentProcessor()
const invoiceManager = new InvoiceManager()
const logisticsManager = new LogisticsManager()

const camera = new Product('Video camera', 999.99)
const armagan = new User()

try {
  inventory.addProduct(camera)
  inventory.addProduct(camera)

  armagan.addBalnce(1000)

  const order1 = armagan.buy(paymentProcessor, inventory, invoiceManager, camera)
  const order2 = armagan.buy(paymentProcessor, inventory, invoiceManager, camera)

  const delivery = new Delivery(order1, armagan)
  const delivery2 = new Delivery(order2, armagan)

  logisticsManager.deliver(delivery)
  logisticsManager.deliver(delivery2)
} catch (e) {
  console.log(e)
}

AnalyticsManager.printActions()

console.log(armagan)
