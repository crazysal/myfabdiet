var express = require('express');
var router = express.Router();
var request = require('request');
var async = require("async");
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send({"test":"test"})
  res.render('index', {
    title: 'Express'
  });
});
router.get('/calculator', function(req, res, next) {
  // res.send({"test":"test"})
  res.render('calculator', {
    title: 'Express'
  });
});
getNutr = (req, res, next) => {
  sampleReq = {
    "pro_p": 10,
    "carb_p": 15,
    "fat_p": 75,
    "pro_g": 50,
    "carb_g": 75,
    "fat_g": 167,
    "zone": 1,
    "fg": ["0100", "1100", "1800"] //veggies -1100 - baked products -1800, breakfast cereals - 0800, dairy eggs - 0100, fruits juices - 0900, 
  }
  urrrl = "https://api.nal.usda.gov/ndb/nutrients/?max=10&sort=c&format=json&api_key=DEMO_KEY"
  fg_string = ""
  for (n = 0; n < sampleReq.fg.length; n++) {
    fg_string += "&fg=" + sampleReq.fg[n]
  }
  urrrl += fg_string
  if (sampleReq.zone == 1 || sampleReq.zone == 2 || sampleReq.zone == 3) {
    urrrl += "&nutrients=205&nutrients=203&nutrients=204"
  } else if (sampleReq.zone == 4) {
    urrrl += "&nutrients=203&nutrients=205&nutrients=204"
  } else if (sampleReq.zone == 5) {
    urrrl += "&nutrients=204&nutrients=205&nutrients=203"
  }
  responseHandle = (error, response, body) => {
    body = JSON.parse(body)
    if (error) {
      res.send(error)
    } else {
      bodyObj = body.report.foods
      fdaList = [];
      for (key in bodyObj) {
        fdaList.push(bodyObj[key].name)
      }
      sku = wegmanProductSearch(fdaList)
      // hit wegman product search 
      res.send(sku)
    }
  }
  request.get(urrrl, responseHandle)
  // res.send("muh me lele")
}
wegmanProductSearch = (fdaList) => {
  skuReturn = []
  wegProSearchUrl_b = "https://wegmans-es.azure-api.net/productpublic/products/search?criteria="
  // GET https://wegmans-es.azure-api.net/productpublic/products/search?criteria=699997 HTTP/1.1
  // Host: wegmans-es.azure-api.net
  // Product-Subscription-Key: cf65ff63cddc4733ae97bbf578d7f87b
  // Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL3dlZ21hbnMtZXMuYXp1cmUtYXBpLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0Zi8iLCJpYXQiOjE1MTcxMTg3MjAsIm5iZiI6MTUxNzExODcyMCwiZXhwIjoxNTE3MTIyNjIwLCJhaW8iOiJZMk5nWUxoM09aN3phTjIvaHB0eVRadmo1bC9iQ2dBPSIsImFwcGlkIjoiMmZhOGY3MWYtY2VjNS00OWU5LWJkMGEtMjI3ODBkYzI2YTliIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMTMxOGQ1N2YtNzU3Yi00NWIzLWIxYjAtOWIzYzM4NDI3NzRmLyIsIm9pZCI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInN1YiI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInRpZCI6IjEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0ZiIsInV0aSI6IllvM0h1NTdzR1U2SWtfOVkzZUFSQUEiLCJ2ZXIiOiIxLjAifQ.PC6Vmm6iY7ijrMhtkgDuOnRQBJSvIyzkv6xAET0g0IaZRDoePj3eS3VZdE86SWebbefJlTCaDTLFx9jg_5LiHUIPP_Oyz8j9PJu-tF_nsFEyVQReCANi11hgf7p-7t7RXnLui9j4-bFS0wYKqGpkcE2b9mSNaL87buFn1Uas3_JI_Ot-RuKhD2GChzjarYMuz6uWSExiIxG9zwN_A9NP3XpHFpRu4Hkm4xNO9_X0ObqsyROKQqWdS38ot-rs70rhCCigzcM1mLZXJAK8ocJX0aWSErAeYKef_aDKeYtzTnibs6So6y4Yj0VlWG9OzxaLIwWWA4b5ZQR_vUQ56LrwYA
  // Array to hold async tasks
  var asyncTasks = [];
  // Loop through some items
  fdaList.forEach(function(item) {
    // We don't actually execute the async action here
    // We add a function containing it to an array of "tasks"
    asyncTasks.push(function(callback) {
      // Call an async function, often a save() to DB
      wegProSearchUrl = wegProSearchUrl_b + item
      ssss = "Product-Subscription-Key"
      var options = {
        url: wegProSearchUrl,
        headers: {
          authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL3dlZ21hbnMtZXMuYXp1cmUtYXBpLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0Zi8iLCJpYXQiOjE1MTcxMTkxMjcsIm5iZiI6MTUxNzExOTEyNywiZXhwIjoxNTE3MTIzMDI3LCJhaW8iOiJZMk5nWUxBNWNUbkgxTXo2aG1oRW9GWFlaaXN0QUE9PSIsImFwcGlkIjoiMmZhOGY3MWYtY2VjNS00OWU5LWJkMGEtMjI3ODBkYzI2YTliIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMTMxOGQ1N2YtNzU3Yi00NWIzLWIxYjAtOWIzYzM4NDI3NzRmLyIsIm9pZCI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInN1YiI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInRpZCI6IjEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0ZiIsInV0aSI6IkJrc0FLeE0tNDBDbllBYUkwZXNRQUEiLCJ2ZXIiOiIxLjAifQ.i2AR1gonDJyuwtO00WQtCnTZ1A_QwFFfxiQiT3aU52FXVEFg2WUQVg9dyEzLVr9A9aDqssXXzwatPJOnaedI7KQHpOegKhizoTKTdI2DbzXokeRVoUDhSSiuYuEF--R3ZZnGVhP0WbeBxMzh10UPrxhXVx_q0kcw2Mkc0eAUlgWgUd5uC8lDBPpQq14h3Mih8xu3_gFZrO3Hug9kxtSZ0pJyrf8zKkNc9fc1aoRvuH5Qie1uroXrilYY-sPxcO_dL-wCB7DiReq9-vCtgjAvI482xhGdx7jPxQcjbBRa6VqJ57y4qjLZQZUJ8Isjt3J2jv71ZpQYpqgS7wPpW0FNrQ',
          'product-subscription-key': '3166d4c40f65478699a0b6be7a4f8d3a'
        }
      };
      request.get(options, (error, response, body) => {
        if (error) {
          skuReturn.push(error)
          callback()
        } else {
          skuReturn.push(body)
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
    return skuReturn
  });
}
router.get('/nutr', getNutr);
module.exports = router;