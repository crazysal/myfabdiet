var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.send({"test":"test"})
  res.render('index', { title: 'Express' });
});

router.get('/calculator', function(req, res, next) {
	// res.send({"test":"test"})
  res.render('calculator', { title: 'Express' });
});



getNutr = function(req,res,next){
	urrrl = "https://api.nal.usda.gov/ndb/nutrients/?max=10&sort=c&fg=0100&fg=0500&format=json&api_key=DEMO_KEY&nutrients=203&nutrients=208&nutrients=204"
	responseHandle =  (error, response, body) => {
		if(error){
			res.send(error)
		}
		res.send(body)
	}



	request.get(urrrl, responseHandle)
	// res.send("muh me lele")
}







router.get('/nutr', getNutr);

module.exports = router;
