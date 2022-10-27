const cartQueries = require('../db/queries/cart');
const twilio = require('../twilio');

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render('cart');
});

router.post("/", (req, res) => {
  const userId = req.session.user_id;
  console.log(userId);
  cartQueries.createOrder(userId, null)
    .then((results) => {
    twilio.sendTextMessageRestaurant();
    console.log('create Order Resluts: ', results);
    order_id = results.rows[0].order_id
    res.render('order', {order_id: order_id});
    })
  .catch((e) => console.log('create Order err: ', e.message))
});



module.exports = router;
