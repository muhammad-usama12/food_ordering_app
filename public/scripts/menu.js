$(document).ready(function() {

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
