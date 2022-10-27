$(document).ready(function() {


  const loadOrders = function() {
    console.log('load orders test')
    $.ajax({
      url: `/api/orders`,
      method: "GET",
    })
      .then(function(result) {
        //console.log("get items: ", result)
        renderOrders(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  };


  renderOrders = function(itemList) {
    $("#orders-container").html("");
    let outstandingOrders = [];
    for (let item of itemList) {
      if (!outstandingOrders.includes(item.id)) {
        outstandingOrders.push(item.id)
        const $orderMessage = createOrdersMessage(item);
        console.log('ordermessagediv, ', $orderMessage)
        $("#orders-container").append($orderMessage);
      }
      const $item = createItemElement(item);
      $(`section.order-${item.id}`).append($item);
    }
  };

  createOrdersMessage = function(itemObject) {

    const orderId = itemObject.id;
    const $orderMessageDiv = $('<div class="order-message"></div>')
    const $orderIdMessage = $('<h2>OrderId Number:<h2>')
    const $orderId = $('<h2></h2>');
    const $orderItemSection = $(`<section class="order-${orderId}"></section>`)
    const $orderFillTime = $('<form class="form-group" action="/orders/:id" method="POST"><input class="form-control" type="fill-time" name="fill-time" placeholder="Order Fill Time"><button type="submit" class="btn">Alert Customer</button></form>');
    const $orderComplete = $('<form class="form-group" action="/orders/:id" method="GET"><button type="submit" class="btn">Order Complete</button></form>');

    $orderId.text(orderId);

    $orderMessageDiv.append($orderIdMessage);
    $orderMessageDiv.append($orderId);
    $orderMessageDiv.append($orderItemSection);
    $orderMessageDiv.append($orderFillTime);
    $orderMessageDiv.append($orderComplete);
    console.log('ordermessagediv, ', $orderMessageDiv)
    return $orderMessageDiv;
  };

  // Create's order objects that matches key.value pairs from the database
  createItemElement = function(itemObject) {
    console.log('item Object:', itemObject);
    console.log('item Object name:', itemObject.name);
    const $item = $('<article class="item">');
    const $itemName = $('<h2></h2>');

    $itemName.text(itemObject.name);

    $item.append($itemName);

    return $item;
  };


  loadOrders();

});
