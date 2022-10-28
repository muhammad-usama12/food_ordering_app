# Food Ordering App

This app helps provides a platform for users to order food by choosing from the restaurant's menu. On the restaurant side, it allows the restaurant's to accept the order and provide a fulfillment time. All of this is done via Twilio Api which notifies both restaurant when there is a pending order and users when the restaurant is preparing the order.

## App Screencaps

["Home Page"](https://github.com/muhammad-usama12/midterm_food_order/blob/master/docs/Home%20Page.png)

The Login form determines whether the user is a customer or restaurant admin.

["Menu Page"](https://github.com/muhammad-usama12/midterm_food_order/blob/master/docs/Menu%20Page.png)

If a customer logs in, it redirects them to the menu page to start a new food order.

["Cart Page"](https://github.com/muhammad-usama12/midterm_food_order/blob/master/docs/Cart%20Page.png)

The customer can process to the cart to see the items they have selected and checkout.

['Order Fill-Time'](https://github.com/muhammad-usama12/midterm_food_order/blob/master/docs/Order%20Fill-Time.png)

Once the restaurant receieves a text confirming an order, they can login as admin and retrieve the orders and confirm the time i'll take to prepare it.

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Installing Missing Dependencies

Install dependencies: npm i

Missing dependencies can be installed with: "npm install 'package'

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- Body Parser
- Cookie Session
- Chalk
- Dotenv
- Morgan
- Sass
- Twilio
