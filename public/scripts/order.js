$(document).ready(function() {


  const loadOrder = function() {
  console.log('load cart test')
  $.ajax({
    url: `/api/order`,
    method: "GET",
  })
  .then(function(result) {

    renderOrder(result);
  })
  .catch(function (err) {
    console.log(err);
  });
};


renderOrder = function(order) {
  $("#order-container").html("");
  for (let item of order) {
    const $order = createOrderElement(item);
    $("#order-container").append($order);
  }
};

// Create's order objects that matches key.value pairs from the database
createOrderElement = function(orderObject) {
  console.log('Order Object:', orderObject);
  console.log('Order Object name:', orderObject.name);
  const $order = $('<article class="order-item">');
  const $itemName = $('<h2></h2>');
  const $itemPhoto = $('<p></p>');

  $itemName.text(orderObject.name);
  $itemPhoto.text(orderObject.photo_url);

  $order.append($itemName);
  $order.append($itemPhoto);

  return $order;
};


loadOrder();

});
