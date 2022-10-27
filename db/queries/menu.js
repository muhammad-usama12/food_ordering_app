const db = require('../connection');

const getMenuItems = () => {
  return db.query(`
    SELECT *
    FROM menu_items
    `)
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getMenuItems err: ', e.message));
};

const getMenuItemsByType = (type) => {
  return db.query(`
    SELECT *
    FROM menu_items
    WHERE type=$1
    `, [type])
    .then(data => {
      return data.rows;
    }).catch((e) => {
      console.log('getMenuItemsByType err: ', e.message);
    });
};

const addChoice = (menuId, userId) => {
  return db.query(`
    INSERT INTO choices (menu_id, user_id)
    VALUES ($1, $2)
    RETURNING *
    `, [menuId, userId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('addChoice err: ', e.message));
};

const checkAdmin = (userId) => {
  return db.query(`
    SELECT is_admin
    FROM users
    WHERE id=$1
    `, [userId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('checkAdmin err: ', e.message));
};

module.exports = { getMenuItems, getMenuItemsByType, addChoice, checkAdmin };
