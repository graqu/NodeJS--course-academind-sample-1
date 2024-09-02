const express = require('express');
const path = require('path');
const errorHandlers = require('./contollers/errors.js');
const db = require('./util/database.js');
// const expressHbs = require('express-handlebars');

const app = express();

// app.engine(
//   'hbs',
//   expressHbs({ layoytsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }),
// );
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

db.execute('SELECT * FROM products')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

const bodyParse = require('body-parser');
const exp = require('constants');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorHandlers.handleNotFound);

app.listen(3000);
