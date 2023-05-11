module.exports = class LogisticsManager {
  deliver(delivery) {
    delivery.order.delivered = true
    console.log('delivering', delivery)
    return true
  }
}
