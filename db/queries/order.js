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





module.exports = { getItemsByOrderId, getPhoneByOrderId, addFillTimeByPhone };
