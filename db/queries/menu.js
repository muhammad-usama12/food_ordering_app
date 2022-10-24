//additional info to verify:
//1. Queries work
//2. functions are required in the public scripts

const db = require('../connection');

const getMenuItems = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getMenuItems err: ', e));
};

const getMenuItemsByType = (type) => {
  return db.query(`
    SELECT *
    FROM menu_items
    WHERE type=$1;
    `, [type])
    .then(data => {
      return data.rows;
    }).catch((e) => {
      console.log('getMenuItemsByType err: ', e)
    });
}

const addChoice = (menuId, userId) => {
  return db.query(`
    INSERT INTO choices (menu_id, user_id)
    VALUES ($1, $2);
    `, [menuId, userId])
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('addChoice err: ', e));
}

module.exports = { getMenuItems, getMenuItemsByType, addChoice };