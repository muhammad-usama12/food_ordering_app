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



module.exports = router;
