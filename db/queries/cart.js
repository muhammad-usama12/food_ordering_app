const db = require("../connection");

const getCartChoices = (userId) => {
  return db.query(`
  SELECT choices.id, choices.menu_id, menu_items.name, menu_items.photo_url
  FROM choices
  JOIN menu_items ON choices.menu_id = menu_items.id
  WHERE choices.user_id = $1 AND order_id IS NULL
  `, [userId])
    .then(data => {
      return data.rows;
    }).catch((e) => console.log('getCartChoices err: ', e.message));
};

const deleteCartChoice = (choiceId) => {
  return db.query(`
  DELETE FROM choices
  WHERE id = $1
  `, [choiceId])
    .then(data => {
      console.log(data.rows[0])
      return data.rows[0];
    })
    .catch((e) => console.log('deleteCartChoice err: ', e.message));
};

const createOrder = (userId, specialRequest) => {
  const ordersQueryParams = [userId];
  let ordersQuery1 = `INSERT INTO orders (user_id,`;
  let ordersQuery2 = `VALUES($1,`;
  if (specialRequest) {
    ordersQueryParams.push(specialRequest);
    ordersQuery1 += ` special_requests,`;
    ordersQuery2 += ` $2,`;
  }
  ordersQuery1 += ` time_ordered) `;
  let ordersQuery = ordersQuery1 + ordersQuery2 + ` Now()) RETURNING *`;
  //-----------------------------------
  return db.query(ordersQuery, ordersQueryParams)
    .then(order => {
      return db.query(`
        UPDATE choices
        SET order_id = $1
        WHERE user_id = $2 AND order_id IS NULL
        RETURNING *
        `, [order.rows[0].id, userId]);
    })
    .catch(e => console.log('createOrder Err: ', e.message));
};



module.exports = { getCartChoices, deleteCartChoice, createOrder };



