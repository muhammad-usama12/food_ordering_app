const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// client.messages
// .create({body: 'Hi there', from: '+13238949640', to: '+16475407230'})
// .then(message => console.log(message.sid));

const sendTextMessage = function (name, phone) {
  client.messages.create({
    body: `Hi ${name}, we have received your order!`,
    to: phone,
    from: +13238949640
  })
  .then(message => console.log('confirmation message id:', message.sid))
    .catch(err => {
      console.log('message not sent:', err)
    });
  }

module.exports = { sendTextMessage };
