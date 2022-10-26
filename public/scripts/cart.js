$(document).ready(function() {

  // Create's cart objects that matches key.value pairs from the database
  createCartElement = function(cartObject) {
    console.log('Cart Object:', cartObject);
    const $cart = $('<article class="cart-item">');
    const $cartId = $('<p class="cart_id"></p>');
    const $cartTimeOrdered = $('<p></p>');
    const $cartSpecialRequest = $('<p></p>');
    const $cartName = $('<h2></h2>');
    const $cartPhoto = $('<p></p>');
    const $cartDelete = $('<button type="button" class="remove-item btn">Remove</button>');
    // const $itemDiv = $('<div class=item_container></div>')

    // $cart.append($itemDiv);
    $cartId.text(cartObject.id);
    $cartTimeOrdered.text(cartObject.time_ordered);
    $cartSpecialRequest.text(cartObject.special_request);
    $cartName.text(cartObject.name);
    $cartPhoto.text(cartObject.photo_url);

    $cart.append($cartId);
    $cart.append($cartTimeOrdered);
    $cart.append($cartSpecialRequest);
    $cart.append($cartName);
    $cart.append($cartPhoto);
    $cart.append($cartDelete);
    return $cart;
  };

  $('#cart-container').on('click', 'button.remove-item', function() {
    const $removeButton = $(event.target);
    const $cartItem = $removeButton.closest('article.cart-item');
    const cartId = $cartItem.find('p.cart_id').text()
    $.ajax({
      url: `/api/cart/delete`,
      method: "POST",
      data: { cartId }
    }).then((result) => {
      //should use dynamic reload like with tweeter
      console.log(result);
      location.reload();
    })
      .catch((e) => console.log('/cart/delete post err: ', e.message))
  });


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



