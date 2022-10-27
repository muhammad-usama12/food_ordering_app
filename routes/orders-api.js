const express = require("express");
const router = express.Router();
const cartQueries = require('../db/queries/cart');
const orderQueries = require('../db/queries/order');

router.get("/", (req, res) => {
  cartQueries.getIncompleteOrders().then((results) => {
    res.send(results);
  })
});

module.exports = router;
