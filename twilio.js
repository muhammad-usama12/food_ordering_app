// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // client.messages
// // .create({body: 'Hi there', from: '+13238949640', to: '+14165239111'})
// // .then(message => console.log("message test:", message.sid))
// // .catch(err => console.log('message error:', err));

// const sendTextMessageCustomer = function (name, phone) {
//   client.messages.create({
//     body: `Hi ${name}, we have received your order!`,
//     to: phone,
//     from: +13238949640
//   })
//   .then(message => console.log('confirmation message id:', message.sid))
//     .catch(err => {
//       console.log('message not sent:', err)
//     });
//   }
// const sendTextMessageRestaurant = function () {
//   client.messages.create({
//     body: `Hi! You have a new order. Please visit http://localhost:8080/orders to view the order list!`,
//     to: +16475407230, //test with my number
//     from: +13238949640
//   })
//   .then(message => console.log('confirmation message id:', message.sid))
//     .catch(err => {
//       console.log('message not sent:', err)
//     });
//   }

// module.exports = { sendTextMessageCustomer, sendTextMessageRestaurant };
