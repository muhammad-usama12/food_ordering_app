/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require("express");
const router = express.Router();
const menuQueries = require('../db/queries/menu');


router.get("/", (req, res) => {
  menuQueries.getMenuItems().then((results) => {
      renderMenu(results);
    });
});


module.exports = router;
