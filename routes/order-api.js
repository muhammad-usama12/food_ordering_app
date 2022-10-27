const express = require("express");
const { checkAdmin } = require("../db/queries/menu");
const router = express.Router();
const orderQueries = require('../db/queries/order');

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  console.log('userId', userId);
  checkAdmin(userId)
    .then(result => {
      if (result.is_admin) {
        console.log('checkAdmin(userId): ', result.is_admin);
        return orderQueries.getIncompleteOrders()
          .then((result) => {
            console.log('incomplete orders: ', result);
          })
          .catch((e) => console.log('admin get orders err: ', e.message));
      }
      return orderQueries.getOrderIdByUserId(userId)
        .then((result) => {
          const orderId = result.id;
          console.log('orderId: ', orderId)
          return orderQueries.getItemsByOrderId(orderId)
        })
        .then((results) => {
          console.log('order ID test:', results);
          res.send(results)
        })
        .catch((e) => console.log('customer get order err: ', e.message));
  })
});



module.exports = router;
