/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const menuQueries = require('../db/queries/menu')
const cartQueries = require('../db/queries/cart')

//This route is for testing the db query functions
//can be deleted and replaced with actual route later
router.get('/', (req, res) => {
  req.session.cookie;
  menuQueries.getMenuItems()
    .then(menuItems => {
      console.log({ menuItems });
      res.json({ menuItems });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
