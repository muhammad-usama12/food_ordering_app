// const createOrder = (userId, specialRequest) => {
//   const ordersQueryParams = [userId];
//   let ordersQuery = `INSERT INTO orders (user_id, special_requests, time_ordered) VALUES($1,`
//   if (specialRequest) {
//     ordersQueryParams.push(specialRequest);
//     ordersQuery += ` $2`
//   }
//   ordersQuery += ` Now()) RETURNING *`

//   return db.query(`
//   BEGIN TRANSACTION
//   `)
//     .then(() => {
//       return db.query(`
//     INSERT INTO orders (user_id, special_requests, time_ordered)
//   VALUES ($1, $2, Now())
//   RETURNING *
//   `, ordersQueryParams)
//     })
//     .then((result) => {
//       console.log(result.rows[0]);
//       const order = result.rows[0];
//       const orderId = order.id;
//       const userId = order.user_id;
//       return db.query(`
//       UPDATE choices
//       SET order_id = $1
//       WHERE user_id = $2 AND order_id IS NULL
//       RETURNING *;
//       `, [orderId, userId])
//     })
//     .then((result) => {
//       return db.query(`
//       COMMIT
//       RETURNING *;
//       `)
//     })
//     .then((result) => {
//       console.log(result.rows);
//       return result.rows;
//       /* trigger text to restaurant */
//     })
//     .catch((e) => console.log('createOrder err: ', e.message))
// };

// //Update the below



// const createOrder = (userId, specialRequest) => {
//   const ordersQueryParams = [userId];
//   let ordersQuery = `INSERT INTO orders (user_id, special_requests, time_ordered) VALUES($1,`
//   if (specialRequest) {
//     ordersQueryParams.push(specialRequest);
//     ordersQuery += ` $2`
//   }
//   ordersQuery += ` Now()) RETURNING *`

//   db.query('BEGIN', err => {
//     if (err) {
//       console.log('err on begin: ', err);
//       return;
//     }
//     db.query(ordersQuery, ordersQueryParams, (err, res) => {
//       if (err) {
//         console.log('err on ordersQuery: ', err);
//         return res.rows;
//       }
//       db.query(`
//       UPDATE choices
//       SET order_id = $1
//       WHERE user_id = $2 AND order_id IS NULL
//       RETURNING *;
//       `, [orderId, userId], (err, res) => {
//         if (err) {
//           console.log('err on choicesQuery: ', err);
//           return res.rows;
//         }
//       })
//     })
//     db.query(insertPhotoText, insertPhotoValues, (err, res) => {
//       if (shouldAbort(err)) return
//       client.query('COMMIT', err => {
//         if (err) {
//           console.error('Error committing transaction', err.stack)
//         }
//         done()
//       })
//     })
//   })
// })
