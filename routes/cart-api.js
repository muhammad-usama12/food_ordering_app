const express = require("express");
const router = express.Router();
const cartQueries = require('../db/queries/cart');

router.get("/", (req, res) => {
  cartQueries.getCartChoices(3).then((results) => {
    console.log("cart choice:", results);
    res.send(results);
  })
});

module.exports = router;
