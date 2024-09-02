const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'jw-test_schema',
  password: 'samplePass12$',
});

module.exports = pool.promise();
