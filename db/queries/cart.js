//additional info to verify:
//1. Queries work
//2. functions are required in the public scriptsconst db = require('../connection');

const db = require("../connection");

const getCartChoices = (userId) => {
  return db.query(`
  SELECT choices.id, choices.menu_id, menu_items.name, menu_items.photo_url
  FROM choices
  JOIN menu_items ON choices.menu_id = menu_items.id
  WHERE choices.user_id = $1 AND order_id IS NULL;
  `,[userId])
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getCartChoices err: ', e));
};

const deleteCartChoice = (choiceId) => {
  return db.query(`
  DELETE FROM choices
  WHERE id = $1;
  `, [choiceId])
    .then(data => {
      console.log(data.rows[0])
      return data.rows[0];
    })
    .catch((e) => console.log('deleteCartChoice err: ', e));
};

const createOrder = (userId, specialRequest) => {
  return db.query(`
  BEGIN TRANSACTION;
  INSERT INTO orders (user_id, special_requests, time_ordered)
  VALUES ($1, $2, Now())
  RETURNING *;
  `, [userId, specialRequest])
    .then((result) => {
      console.log(result.rows[0]);
      const order = result.rows[0];
      const orderId = order.id;
      const userId = order.user_id;
      return db.query(`
      UPDATE choices
      SET order_id = $1
      WHERE user_id = $2 AND order_id IS NULL
      RETURNING *;
      COMMIT;
      `, [orderId, userId])
    })
    .then((result) => {
      console.log(result.rows);
      /* trigger text to restaurant */
    })
  .catch((e) => console.log('createOrder err: ', e))
};

module.exports = { getCartChoices, deleteCartChoice, createOrder };
