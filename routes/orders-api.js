const express = require("express");
const { checkAdmin } = require("../db/queries/menu");
const router = express.Router();
const orderQueries = require('../db/queries/order');
const { sendTextMessageCustomer } = require("../twilio");

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  console.log('userId', userId);
  checkAdmin(userId)
    .then(result => {
      if (!result.is_admin) {
        return res.render('menu');
      }
      console.log('checkAdmin(userId): ', result.is_admin);
      return orderQueries.getIncompleteOrders()
        .then((results) => {
          console.log('incomplete orders: ', results);
          return res.send(results)
        })
        .catch((e) => console.log('admin get orders err: ', e.message));
    });
});

router.post("/:id", (req, res) => {
  const userId = req.session.user_id;
  const orderId = req.params.id;
  const fillTime = req.body.fillTime;
  console.log('orderId from params: ', orderId);
  checkAdmin(userId)
    .then(result => {
      if (!result.is_admin) {
        return res.render('menu')
      }
      console.log('calling filltime function...');
      return orderQueries.addFillTimeByOrderId(fillTime, orderId)
    })
    .then(result => {
      const orderId = result.id;
      return orderQueries.getUserByOrderId(orderId)
    })
    .then((result) => {
      const orderId = result.order_id;
      const name = result.name;
      const phone = result.phone;
      const fill_time = result.fill_time_minutes;
      sendTextMessageCustomer(name, phone, orderId, fill_time)
      console.log('orderId: ', orderId)
    })
    .then(result => res.render('orders'))
    .catch((e) => console.log(e.message));
})

router.get("/:id", (req, res) => {
  const userId = req.session.user_id;
  const orderId = req.params.id;
  console.log('orderId from params: ', orderId);
  checkAdmin(userId)
    .then(result => {
      if (!result.is_admin) {
        res.render('menu')
      }
      console.log('calling time_completed function...');
      return orderQueries.addTimeCompletedByOrderId(orderId)
    })
    .then(result => res.render('orders'))
    .catch((e) => console.log(e.message));
})

module.exports = router;
