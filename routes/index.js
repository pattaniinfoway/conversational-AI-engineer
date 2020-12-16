var express = require('express');
var router = express.Router();


const {
  parseDoc
  
} = require('../controller/doc.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/parseDoc',parseDoc);

module.exports = router;
