const express = require("express");
const router = express.Router();
const menuQueries = require('../db/queries/menu');

router.get("/", (req, res) => {
  menuQueries.getMenuItems().then((results) => {
    res.send(results);
  })
});

module.exports = router;
