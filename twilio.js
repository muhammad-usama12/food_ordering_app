// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendTextMessageCustomer = function (name, phone, order_id, fill_time) {

    client.messages.create({
    body: `Hi ${name}, we have received your order! Your order ${order_id} will be fulfilled in ${fill_time} minutes!`,
    to: phone,
    from: +13238949640
  })
  .then(message => console.log('confirmation message sent to customer:', message.sid))
    .catch(err => {
      console.log('message not sent:', err)
    });
  }
const sendTextMessageRestaurant = function () {
  client.messages.create({
    body: `Hi! You have a new order. Please visit http://localhost:8080/orders to view the order list!`,
    to: +16475407230, //test with my number
    from: +13238949640
  })
  .then(message => console.log('confirmation message id:', message.sid))
    .catch(err => {
      console.log('message not sent:', err)
    });
  }

module.exports = { sendTextMessageCustomer, sendTextMessageRestaurant };
