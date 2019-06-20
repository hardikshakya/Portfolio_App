var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portfolio'
});

connection.connect();

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  connection.query('SELECT * FROM projects', (err, rows, fields) => {
    if(err) throw err;
    res.render('index', {
      rows: rows
    })
  })
});

module.exports = router;
