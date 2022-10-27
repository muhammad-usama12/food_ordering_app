// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const menuQueries = require('./db/queries/menu');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: true }));
app.use(urlencodedParser);
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["session"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuApiRoutes = require("./routes/menu-api");
const menuRoutes = require("./routes/menu");
const cartApiRoutes = require("./routes/cart-api");
const cartRoutes = require("./routes/cart");
const ordersApiRoutes = require("./routes/orders-api");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/menu", menuApiRoutes);
app.use("/api/cart", cartApiRoutes);
app.use("/api/orders", ordersApiRoutes);
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

//login does not check if userID exists or check password
app.post("/login", (req, res) => {
  const userId = req.body.userId
  menuQueries.checkAdmin(userId)
    .then(result => {
      if (userId && result.is_admin) {
        req.session.user_id = userId;
        res.redirect("/order");
      }
      if (userId) {
        req.session.user_id = userId;
        res.redirect("/menu");
      }
    })
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
