const express = require("express");
const router = express.Router();
const cartQueries = require('../db/queries/cart');
const menuQueries = require('../db/queries/menu');

router.get("/", (req, res) => {
  const userId = req.session.user_id;
  cartQueries.getCartChoices(userId).then((results) => {
    res.send(results);
  })
});

router.post("/", (req, res) => {
  const userId = req.session.user_id;
  const menuId = req.body.menuId;
  menuQueries.addChoice(menuId, userId).then((results) => {
    res.send(results);
  })
});

router.post("/delete", (req, res) => {
  console.log('delete router reached')
  const cartId = req.body.cartId;
  console.log('cartId: ', cartId);
  cartQueries.deleteCartChoice(cartId).then((results) => {
    console.log('deleteCartChoice called and returned');
    res.json({ results });
    // res.render('cart');
  })
});

//this is for orders-api being dev'd by muhammad
router.get("/", (req, res) => {
  const userId = req.session.user_id;
  cartQueries.getCartChoices(userId).then((results) => {
    res.send(results);
  })
});

module.exports = router;
