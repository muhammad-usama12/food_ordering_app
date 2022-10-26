const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
.create({body: 'Hi there', from: '+13238949640', to: '+16475407230'})
.then(message => console.log(message.sid));

