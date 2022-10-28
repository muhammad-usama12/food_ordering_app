$(document).ready(function () {
  $("#menu-container").on("click", "i.add-to-cart", function () {
    const $cartButton = $(event.target);
    const $menuItem = $cartButton.closest("article.menu-item");
    const menuId = $menuItem.find("p.menu_id").text();
    $.ajax({
      url: `/api/cart`,
      method: "POST",
      data: { menuId },
    }).catch((e) => console.log("/cart post err: ", e.message));
  });

  // Create's menu objects that matches key.value pairs from the database
  createMenuElement = function (menuObject) {
    console.log("test");
    const $menu = $('<article class="menu-item">');
    const $menuId = $('<p class="menu_id"></p>');
    const $menuName = $("<h2></h2>");
    // const $menuPhoto = $('<p class="photo_url"></p>');
    const $menuAddToCart = $(
      '<i class="add-to-cart fa-sharp fa-solid fa-plus"></i>'
    );

    $menuName.text(menuObject.name);
    console.log("menu object name:", menuObject.name);
    // $menuPhoto.text(menuObject.photo_url);
    $menuId.text(menuObject.id);

    $menu.append($menuId);
    $menu.append($menuName);
    // $menu.append($menuPhoto);
    $menu.append($menuAddToCart);
    return $menu;
  };

  //
  renderMenu = function (menus) {
    console.log("render menu test");
    $("#menu-container").html("");
    for (let menu of menus) {
      const $menu = createMenuElement(menu);
      $("#menu-container").append($menu);
    }
  };

  //
  const loadMenu = function () {
    console.log("load menu test");
    $.ajax({
      url: `/api/menu`,
      method: "GET",
    })
      .then(function (result) {
        console.log("load menu result", result);
        renderMenu(result);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  loadMenu();
});
