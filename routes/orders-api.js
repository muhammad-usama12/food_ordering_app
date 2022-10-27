const express = require("express");
const { checkAdmin } = require("../db/queries/menu");
const router = express.Router();
const orderQueries = require('../db/queries/order');

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  console.log('userId', userId);
  checkAdmin(userId)
    .then(result => {
      if (!result.is_admin) {
        return res.render('menu');
        //need to make this work - maybe break promise chain
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

// router.post("/:id", (req, res) => {
//   const userId = req.session.user_id;
//   const orderId = req.params.id;
//   checkAdmin(userId)
//     .then(result => {
//       if (result.is_admin) {
//         return res.render('menu');
//       }
// })


// for retrieveing name, phone, orderId, fill_time


// router.get("/", (req, res) => {
//   const userId = req.session.user_id;
//   const fill_time = req.body.fill_time;
//   console.log('userId', userId);
//       return orderQueries.getOrderIdByUserId(userId)
//       .then((result) => {
//         const orderId = result.id;
//         return orderQueries.getUserByOrderId(orderId)
//       })
//         .then((result) => {
//           const orderId = result.order_id;
//           const name = result.name;
//           const phone = result.phone;
//           sendTextMessageCustomer(name, phone, orderId, fill_time)
//           console.log('orderId: ', orderId)
//           return orderQueries.getItemsByOrderId(orderId)
//         })
//         .then((results) => {
//           console.log('order ID test:', results);
//           res.send(results)
//         })
//         .catch((e) => console.log('customer get order err: ', e.message));
// });





module.exports = router;
