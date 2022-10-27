const express = require("express");
const { checkAdmin } = require("../db/queries/menu");
const router = express.Router();
const orderQueries = require('../db/queries/order');
const { sendTextMessageCustomer } = require("../twilio");

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  const fill_time = req.body.fill_time;
  console.log('userId', userId);
      return orderQueries.getOrderIdByUserId(userId)
      .then((result) => {
        const orderId = result.id;
        return orderQueries.getUserByOrderId(orderId)
      })
        .then((result) => {
          const orderId = result.order_id;
          const name = result.name;
          const phone = result.phone;
          sendTextMessageCustomer(name, phone, orderId, fill_time)
          console.log('orderId: ', orderId)
          return orderQueries.getItemsByOrderId(orderId)
        })
        .then((results) => {
          console.log('order ID test:', results);
          res.send(results)
        })
        .catch((e) => console.log('customer get order err: ', e.message));
});



module.exports = router;
