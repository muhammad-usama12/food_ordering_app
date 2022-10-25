$(document).ready(function() {


  $('article.menu-item').on('click', '.add-to-cart', () => {
    const menuItemData = $('article.menu-item') //NEED TO ACCESS MENU ITEM DATA AND COOKIE HERE
    $.ajax({
      url: `/cart`,
      method: "POST",
      data: menuItemData
    })
    .catch((e) => console.log('/cart post err: ', e.message))
  })

  // Create's cart objects that matches key.value pairs from the database
  createCartElement = function(cartObject) {
    console.log('test');
    const $cart = $('<article class="cart-item">');
    const $cartId = $('<p></p>');
    const $cartOrderId = $('<p></p>');
    const $cartTimeOrdered = $('<p></p>');
    const $cartSpecialRequest = $('<p></p>');
    const $cartDelete = $('<button type="button" class="btn btn-outline-danger">Delete</button>');

    $cartId.text(cartObject.id);
    $cartOrderId.text(cartObject.order_id);
    $cartTimeOrdered.text(cartObject.time_ordered);
    $cartSpecialRequest.text(cartObject.special_request);

    $cart.append($cartId);
    $cart.append($cartOrderId);
    $cart.append($cartTimeOrdered);
    $cart.append($cartSpecialRequest);
    $cart.append($cartDelete);
    return $cart;
  };



  //
  renderCart = function(carts) {
    console.log('render cart test')
    $("#cart-container").html("");
    for (let cart of carts) {
      const $cart = createCartElement(cart);
      $("#cart-container").append($cart);
    }
  };

  //
  const loadCart = function () {
    console.log('load cart test')
    $.ajax({
      url: `/api/cart`,
      method: "GET",
    })
    .then(function (result) {
      console.log("load cart result", result);
      renderCart(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  loadCart();

});



