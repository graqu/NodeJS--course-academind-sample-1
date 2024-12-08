const express = require('express');
const path = require('path');

const errorHandlers = require('./contollers/errors.js');
const sequelize = require('./util/database.js');
const Product = require('./models/product.js');
const User = require('./models/user.js');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

const bodyParse = require('body-parser');
const exp = require('constants');
const { constants } = require('buffer');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorHandlers.handleNotFound);

Product.belongsTo(User, { constants: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Jacek', email: 'jacek_135@yahoo.pl' });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
