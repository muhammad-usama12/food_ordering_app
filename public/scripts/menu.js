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

});



// Create's menu objects that matches key.value pairs from the database
createTweetElement = function (menuObj) {
  const $menu = $(`
<article class="menu-item">
        `);
  return $menu;
};

//
renderTweets = function (tweets) {
  $("#menu-container").html("");
  for () {
    const $menu = createTweetElement();
    $("#menu-container").prepend($menu);
  }
};

//
const loadMenu = function () {
  $.ajax({
    url: `/menu`,
    method: "GET",
  })
    .then(function (result) {
      console.log(result);
      renderTweets(result);
    })
    .catch(function (err) {
      console.log(err);
    });
};
