const express = require("express");
const router = express.Router();
const cartQueries = require('../db/queries/cart');
const menuQueries = require('../db/queries/menu');

router.get("/", (req, res) => {
  cartQueries.getCartChoices(3).then((results) => {
    console.log("cart choice:", results);
    res.send(results);
  })
});

router.post("/", (req, res) => {
  const userId = req.session.user_id;
  const menuId = req.body.menuId;
  console.log("menuId:", menuId);
  menuQueries.addChoice(menuId, userId).then((results) => {
    console.log("add choice results:", results);
    res.send(results);
  })
});

module.exports = router;
