//getUserByOrderId
$(document).ready(function () {
  const loadOrder = function () {
    console.log("load order test");
    $.ajax({
      url: `/api/order`,
      method: "GET",
    })
      .then(function (result) {
        renderOrder(result);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $(".fill-time-submit").submit(function () {
    // catch the form's submit event
    $.ajax({
      url: "/api/orders", // the file to call
      data: $(this).serialize(), // get the form data
      method: "POST", // GET or POST
      success: function (response) {
        // on success send twilio message
      },
    });
    return false; // cancel original event to prevent form submitting
  });

  //class .fill-time-submit
  // sends the stuff to twilio

  renderOrder = function (order) {
    $("#order-container").html("");
    console.log(order);
    const $orderMessage = createOrderMessage(order);
    $("#order-container").append($orderMessage);
    for (let item of order) {
      const $order = createOrderElement(item);
      $("#order-container").append($order);
    }
  };

  createOrderMessage = function (orderObject) {
    const orderId = orderObject[0].order_id;
    const $orderMessageDiv = $('<div class="order-message"></div>');
    const $orderMessage = $(
      "<h1>Your order is awaiting confirmation from the Restaurant!</h1>"
    );
    const $orderIdMessage = $("<h2>Your order number is:<h2>");
    const $orderId = $("<h2></h2>");

    $orderId.text(orderId);

    $orderMessageDiv.append($orderMessage);
    $orderMessageDiv.append($orderIdMessage);
    $orderMessageDiv.append($orderId);

    return $orderMessageDiv;
  };

  // Create's order objects that matches key.value pairs from the database
  createOrderElement = function (orderObject) {
    console.log("Order Object:", orderObject);
    console.log("Order Object name:", orderObject.name);
    const $order = $('<article class="order-item">');
    const $itemName = $("<h2></h2>");
    const $itemPhoto = $("<p></p>");

    $itemName.text(orderObject.name);

    $order.append($itemName);

    return $order;
  };

  loadOrder();
});
