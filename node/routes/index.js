var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send({"test":"test"})
  // res.render('calculator', { title: 'Express' });
});

module.exports = router;
