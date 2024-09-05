const Sequelize = require('sequelize');

const sequelize = new Sequelize('jw-test_schema', 'root', 'samplePass12$', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
