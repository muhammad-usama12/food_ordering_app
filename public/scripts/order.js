$(document).ready(function() {


const loadOrder = function() {
  console.log('load cart test')
  $.ajax({
    url: `/api/order`,
    method: "GET",
  })
  .then(function (result) {
    console.log("load order result", result);
    renderOrder(result);
  })
  .catch(function (err) {
    console.log(err);
  });
};

//
// renderOrder = function(orders) {
//   console.log('render order test')
//   $("#order-container").html("");
//   for (let order of orders) {
//     const $order = createOrderElement(order);
//     $("#order-container").append($order);
//   }
// };

// // Create's order objects that matches key.value pairs from the database
// createOrderElement = function(orderObject) {
//   console.log('Order Object:', orderObject);
//   const $order = $('<article class="order-item">');
//   const $cartId = $('<p></p>');
//   const $cartTimeOrdered = $('<p></p>');
//   const $cartSpecialRequest = $('<p></p>');
//   const $cartName = $('<h2></h2>');
//   const $cartPhoto = $('<p></p>');
//   const $cartDelete = $('<button type="button" class="remove-item btn">Remove</button>');
//   // const $itemDiv = $('<div class=item_container></div>')

//   // $cart.append($itemDiv);
//   // $cartId.text(cartObject.id);
//   // $cartTimeOrdered.text(cartObject.time_ordered);
//   // $cartSpecialRequest.text(cartObject.special_request);
//   // $cartName.text(cartObject.name);
//   // $cartPhoto.text(cartObject.photo_url);

//   $order.append($cartId);
//   $order.append($cartTimeOrdered);
//   $order.append($cartSpecialRequest);
//   $order.append($cartName);
//   $order.append($cartPhoto);
//   $order.append($cartDelete);
//   return $order;
// };


loadOrder();

});
