const { Pool } = require("pg");
const db = require("../connection");

// -----OLD CREATE ORDER FUNC. BASED ON PG SITE-------
// const createOrder = (userId, specialRequest) => {
//   const ordersQueryParams = [userId];
//   let ordersQuery = `INSERT INTO orders (user_id, special_requests, time_ordered) VALUES($1,`
//   if (specialRequest) {
//     ordersQueryParams.push(specialRequest);
//     ordersQuery += ` $2`;
//   }
//   ordersQuery += ` Now()) RETURNING *`;

//   db.connect((err, client, done) => {
//     const shouldAbort = err => {
//       if (err) {
//         console.error('Error in transaction', err.stack)
//         client.query('ROLLBACK', err => {
//           if (err) {
//             console.error('Error rolling back client', err.stack)
//           }
//           // release the client back to the pool
//           done()
//         })
//       }
//       return !!err
//     }
//     db.query('BEGIN', err => {
//       if (shouldAbort(err)) {
//         console.log('err on begin: ', err);
//         return;
//       }
//       db.query(ordersQuery, ordersQueryParams, (err, res) => {
//         if (shouldAbort(err)) {
//           console.log('err on ordersQuery: ', err);
//           return;
//         }
//         db.query(`
//         UPDATE choices
//         SET order_id = $1
//         WHERE user_id = $2 AND order_id IS NULL
//         RETURNING *;
//         `, [res.rows[0].orders.id, userId], (err, res) => {
//           if (shouldAbort(err)) {
//             console.log('err on choicesQuery: ', err);
//             return;
//           }
//           db.query(`COMMIT`, err => {
//             if (shouldAbort(err)) {
//               console.error('Error committing transaction', err.stack)
//             }
//             done()
//           })
//         })
//       })
//     })
//   })
// };

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
  return db.query('BEGIN')
    .then(data => {
      return db.query(ordersQuery, ordersQueryParams);
    })
    .then(order => {
      console.log('order row: ', order.rows[0])
      console.log('order id: ', order.rows[0].id)
      return db.query(`
        UPDATE choices
        SET order_id = $1
        WHERE user_id = $2 AND order_id IS NULL
        RETURNING *
        `, [order.rows[0].id, userId]);
    })
    .then(choices => {
      console.log(choices);
      return db.query(`COMMIT`);
    })
    .catch(e => console.log('createOrder Err: ', e.message));
};

module.exports = { createOrder };
