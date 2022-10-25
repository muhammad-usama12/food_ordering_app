/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cartQueries = require('../db/queries/cart');

router.get('/', (req, res) => {
  cartQueries.getCartChoices().then((results) => {
    res.render('cart', { cartData: results });
  })
});

router.post('/', (req, res) => {
  const userId = req.session.
  menuQueries.addChoice()
  })

module.exports = router;
