const express = require("express");
const router = express.Router();
const orderQueries = require('../db/queries/order');


router.get("/", (req, res) => {
  orderQueries.getItemsByOrderId().then((results) => {
    console.log('order ID test:', results);
    res.send(results);
  })
});



module.exports = router;
