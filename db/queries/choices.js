//additional info to verify:
//1. Queries work
//2. functions are required in the public scriptsconst db = require('../connection');

const getCartChoices = (userId) => {
  return db.query(`
  SELECT choices.id, choices.menu_id, menu_items.name, menu_items.photo_url
  FROM choices
  JOIN menu_items ON choices.menu_id = menu_items.id
  WHERE choices.user_id = $1 AND order_id = NULL;
  `,[userId])
    .then(data => {
      return data.rows;
    });
};

const deleteCartChoice = (choiceId) => {
  return db.query(`
  DELETE FROM choices
  WHERE id = $1;
  `, [choiceId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getCartChoices, deleteCartChoice };
