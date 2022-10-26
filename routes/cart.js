const cartQueries = require('../db/queries/cart');

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render('cart');
});

router.post("/", (req, res) => {
  const userId = req.session.user_id;
  cartQueries.createOrder(userId, null).then((results) => {
    res.render('cart');
  })
});


// router.post('/', (req, res) => {
//   const userId = req.session.
//   menuQueries.addChoice()
//   })

module.exports = router;
