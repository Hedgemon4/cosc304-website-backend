const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session')
const bodyParser = require('body-parser')
// const cors = require('cors')

let loadData = require('./routes/loaddata');
let listOrder = require('./routes/listorder');
let listProd = require('./routes/listprod');
let addCart = require('./routes/addcart');
let showCart = require('./routes/showcart');
let checkout = require('./routes/checkout');
let order = require('./routes/order');

const app = express();

// This DB Config is accessible globally
dbConfig = {
  user: 'SA',
  password: 'YourStrong@Passw0rd',
  server: 'db',
  database: 'tempdb',
  options: {
    'enableArithAbort': true,
    'encrypt': false,
  }
}

// Setting up the session.
// This uses MemoryStorage which is not
// recommended for production use.
app.use(
//     cors({
//   origin: '*'
// }),
    session({
  secret: 'COSC 304 Rules!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 60000,
  }
}))

// Setting up the rendering engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setting up Express.js routes.
// These present a "route" on the URL of the site.
// Eg: http://127.0.0.1/loaddata
app.use('/loaddata', loadData);
app.use('/listorder', listOrder);
app.use('/listprod', listProd);
app.use('/addcart', addCart);
app.use('/showcart', showCart);
app.use('/checkout', checkout);
app.use('/order', order);
app.use(express.json())

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Access-Control-Allow-Methods', '*')
  next();
})

// Rendering the main page
app.get('/', function (req, res) {
  res.render('index', {
    title: "YOUR NAME Grocery Main Page"
  });
})

// Starting our Express app
app.listen(3000)
