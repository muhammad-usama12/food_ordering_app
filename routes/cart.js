const cartQueries = require('../db/queries/cart');
const twilio = require('../twilio');

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render('cart');
});

router.post("/", (req, res) => {
  const userId = req.session.user_id;
  cartQueries.createOrder(userId, null).then((results) => {
    twilio.sendTextMessageRestaurant();
    order_id = results.rows[0].order_id
    res.render('order', {order_id: order_id});
  })
});



module.exports = router;
