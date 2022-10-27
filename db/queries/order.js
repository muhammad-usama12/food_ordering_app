const db = require("../connection");

const getItemsByOrderId = (orderId) => {
  return db.query(`
  SELECT menu_items.name
  FROM menu_items
  JOIN choices on menu_items.id=menu_id
  WHERE order_id = $1
  `, [orderId])
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getItemsByOrderId err: ', e.message));
};

const getPhoneByOrderId = (orderId) => {
  return db.query(`
  SELECT DISTINCT users.phone, users.name
  FROM users
  JOIN choices on users.id=user_id
  WHERE order_id = $1
  `, [orderId])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('getPhoneByOrderId err: ', e.message));
};

const addFillTimeByPhone = (fillTime, phoneNumber) => {
  return db.query(`
  UPDATE orders
  SET fill_time_minutes = $1
  FROM users
  WHERE users.id=user_id
  AND phone= $2
  AND fill_time_minutes IS NULL
  RETURNING users.name, fill_time_minutes
  `, [fillTime, phoneNumber])
    .then(data => {
      return data.rows[0];
    }).catch((e) => console.log('addFillTimeByPhone err: ', e.message));
};

const getIncompleteOrders = () => {
  return db.query(`
  SELECT id
  FROM orders
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





module.exports = { getItemsByOrderId, getPhoneByOrderId, addFillTimeByPhone, getIncompleteOrders, getOrderIdByUserId };
