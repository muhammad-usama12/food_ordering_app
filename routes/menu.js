/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const menuQueries = require('../db/queries/menu')

//This route is for testing the db query functions
//can be deleted and replaced with actual route later
router.get('/', (req, res) => {
  menuQueries.getMenuItems()
    .then(menuItems => {
      res.json({ menuItems });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
