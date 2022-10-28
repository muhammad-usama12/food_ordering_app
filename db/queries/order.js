const db = require("../connection");

const getItemsByOrderId = (orderId) => {
  return db.query(`
  SELECT menu_items.name, choices.order_id
  FROM menu_items
  JOIN choices on menu_items.id=menu_id
  WHERE order_id = $1
  `, [orderId])
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getItemsByOrderId err: ', e.message));
};

const getUserByOrderId = (orderId) => {
  return db.query(`
  SELECT DISTINCT users.phone, users.name, choices.order_id, orders.fill_time_minutes
  FROM users
  JOIN choices on users.id=user_id
  JOIN orders on orders.id=order_id
  WHERE order_id = $1
  `, [orderId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('getPhoneByOrderId err: ', e.message));
};

const addFillTimeByOrderId = (fillTime, orderId) => {
  return db.query(`
  UPDATE orders
  SET fill_time_minutes = $1
  WHERE id = $2
  RETURNING id, fill_time_minutes
  `, [fillTime, orderId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('addFillTimeByOrderId err: ', e.message));
};

const getIncompleteOrders = () => {
  return db.query(`
  SELECT orders.id, menu_items.name, orders.fill_time_minutes
  FROM orders
  JOIN choices ON orders.id=choices.order_id
  JOIN menu_items ON menu_items.id=menu_id
  WHERE time_completed IS NULL
  `)
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getIncompleteOrders err: ', e.message));
}

const getOrderIdByUserId = (userId) => {
  return db.query(`
  SELECT id
  FROM orders
  WHERE user_id = $1
  ORDER BY time_ordered DESC
  LIMIT 1
  `, [userId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('getPhoneByOrderId err: ', e.message));
};

const addTimeCompletedByOrderId = (orderId) => {
  return db.query(`
  UPDATE orders
  SET time_completed = Now()
  WHERE id = $1
  RETURNING id
  `, [orderId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('addTimeCompleted err: ', e.message));
};

module.exports = {
  getItemsByOrderId,
  getUserByOrderId,
  addFillTimeByOrderId,
  getIncompleteOrders,
  getOrderIdByUserId,
  addTimeCompletedByOrderId
};
