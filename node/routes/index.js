var express = require('express');
var router = express.Router();
var request = require('request');
var async = require("async");
var hader_price = {
  authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL3dlZ21hbnMtZXMuYXp1cmUtYXBpLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0Zi8iLCJpYXQiOjE1MTcxNDcyOTIsIm5iZiI6MTUxNzE0NzI5MiwiZXhwIjoxNTE3MTUxMTkyLCJhaW8iOiJZMk5nWUdpOG0rOTQycGVadmNIdTZwZnE0d1VkQUE9PSIsImFwcGlkIjoiMmZhOGY3MWYtY2VjNS00OWU5LWJkMGEtMjI3ODBkYzI2YTliIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMTMxOGQ1N2YtNzU3Yi00NWIzLWIxYjAtOWIzYzM4NDI3NzRmLyIsIm9pZCI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInN1YiI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInRpZCI6IjEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0ZiIsInV0aSI6IjhieldfZWdrV1V1S1dmd2duTzRRQUEiLCJ2ZXIiOiIxLjAifQ.NgYccheLkuOFOEnhY2KyT5s9Ycmt0-OjiH2Q8HTQBCDbUl-7LhdV2dLAaSjyPWsFAwZRxBk0W3CBUNUZMsqSIEorMUDMBsSCOXpdTupnrRjWba6WWulg33Jy0RK6Hxz8Br-Ile--yVkYW6VOrQGIT21Ibx726J0qXQFHjeYMJfDCsm2pGcfjHM9X9JnyyjL94cQ4FqnT1sqdg28oG5Tae8h1yIRRYenMj3f2MduA8Ac_E0o88l8_wBFxYyeyEflK77gXIHLSZhsfsYb1sGKtbuGRqfWexg6xK_eg9479hn2oyZ1qHjgP6DcnpF6mK_056XL_un-WB7otPq7lqxS9ng',
  'price-subscription-key': '3166d4c40f65478699a0b6be7a4f8d3a'
}
var hader = {
  authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL3dlZ21hbnMtZXMuYXp1cmUtYXBpLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0Zi8iLCJpYXQiOjE1MTcxNDcyOTIsIm5iZiI6MTUxNzE0NzI5MiwiZXhwIjoxNTE3MTUxMTkyLCJhaW8iOiJZMk5nWUdpOG0rOTQycGVadmNIdTZwZnE0d1VkQUE9PSIsImFwcGlkIjoiMmZhOGY3MWYtY2VjNS00OWU5LWJkMGEtMjI3ODBkYzI2YTliIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMTMxOGQ1N2YtNzU3Yi00NWIzLWIxYjAtOWIzYzM4NDI3NzRmLyIsIm9pZCI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInN1YiI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInRpZCI6IjEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0ZiIsInV0aSI6IjhieldfZWdrV1V1S1dmd2duTzRRQUEiLCJ2ZXIiOiIxLjAifQ.NgYccheLkuOFOEnhY2KyT5s9Ycmt0-OjiH2Q8HTQBCDbUl-7LhdV2dLAaSjyPWsFAwZRxBk0W3CBUNUZMsqSIEorMUDMBsSCOXpdTupnrRjWba6WWulg33Jy0RK6Hxz8Br-Ile--yVkYW6VOrQGIT21Ibx726J0qXQFHjeYMJfDCsm2pGcfjHM9X9JnyyjL94cQ4FqnT1sqdg28oG5Tae8h1yIRRYenMj3f2MduA8Ac_E0o88l8_wBFxYyeyEflK77gXIHLSZhsfsYb1sGKtbuGRqfWexg6xK_eg9479hn2oyZ1qHjgP6DcnpF6mK_056XL_un-WB7otPq7lqxS9ng',
  'product-subscription-key': '3166d4c40f65478699a0b6be7a4f8d3a'
}
var zooper = []
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send({"test":"test"})
  res.render('index', {
    title: 'Express'
  });
});
router.post('/testNutr', function(req, res, next) {
  values = {
    "query":req.query,
    "body": req.body,
    "params": req.params}
  res.send(values)
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
    "zone": 4,
    "fg": ["0900", "1100", "0100", "0800"] //veggies -1100 - baked products -1800, breakfast cereals - 0800, dairy eggs - 0100, fruits juices - 0900, 
  }
  urrrl = "https://api.nal.usda.gov/ndb/nutrients/?subset=1&max=5&sort=c&format=json&api_key=DEMO_KEY"
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
  console.log("Hit 1st api : ", urrrl)
  responseHandle = (error, response, body) => {
    if (error) {
      res.send(error)
    } else {
      body = JSON.parse(body)
      // console.log("1ast",body)
      bodyObj = body.report.foods
      fdaList = [];
      for (key in bodyObj) {
        fdaList.push(bodyObj[key].name)
      }

      wegmanProductSearch(fdaList, function(err, product_data) {
        wegmanProductAvail(product_data, function(err, avail_data) {
          wegmanProductPrice(avail_data, function(err, price_data) {
            zooper.push(price_data)
            // res.send(price_data)
            wegmanProductNutrition(avail_data, function(err, nutri_data) {
              zooper.push(nutri_data)
              res.send(zooper)
            })
          })
        })
      })
    }
  }
  request.get(urrrl, responseHandle)
}
wegmanProductSearch = (fdaList, cb) => {

  console.log("====================================================================================")
  console.log("====================================================================================")
  console.log("Searching Products", fdaList)
  skuReturn = []
  wegProSearchUrl_b = "https://wegmans-es.azure-api.net/productpublic/products/search?criteria="
  var asyncTasks = [];
  // Loop through some items
  fdaList.forEach(function(item) {

    asyncTasks.push(function(callback) {
      wegProSearchUrl = wegProSearchUrl_b + item
      var options = {
        url: wegProSearchUrl,
        headers: hader
      };
      request.get(options, (error, response, body) => {

        if (error || response.statusCode !=200 ) {
          console.log(response.statusCode)
          console.log("ERROR in PRODUCT SEARCH ", error)
          callback()
        } else {
          body = JSON.parse(body)
          bodyItem = body.Results[0]
          skuReturn.push(bodyItem)
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
    cb(null, skuReturn)
  });
}
wegmanProductAvail = (products, cb) => {

  console.log("====================================================================================")
  console.log("====================================================================================")
  console.log("Calculating Product Avail", products)
  availReturn = []
  wegProAvailUrl_b = "https://wegmans-es.azure-api.net/productpublic/productavailability/"
  var asyncTasks = [];
  products.forEach(function(item) {
    asyncTasks.push(function(callback) {
      wegProAvailUrl = wegProAvailUrl_b + item.ItemNumber + "/stores"
      var options = {
        url: wegProAvailUrl,
        headers: hader
      };
      request.get(options, (error, response, body) => {
        body = JSON.parse(body)
        if (error || response.statusCode !=200 ) {
          console.log(response.statusCode)
          console.log("ERROR IN PRODUCT AVAIL", error)
          callback()
        } else {
          if (body.IsChainAvailable) {
            finalBody = getTopVelocity(body)
            availReturn.push(finalBody)
          }
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
    cb(null, availReturn)
  });
}
wegmanProductPrice = (availProds, cb) => {

  console.log("====================================================================================")
  console.log("====================================================================================")
  console.log("calculating product prices", availProds)
  priceReturn = []
  wegProPriceUrl_b = "https://wegmans-es.azure-api.net/pricepublic/pricing/current_prices/"
  var asyncTasks = [];
  availProds.forEach(function(item) {
    asyncTasks.push(function(callback) {
      wegProPriceUrl = wegProPriceUrl_b + item.Sku + "/" + item.StoreNumber
      var opptions = {
        url: wegProPriceUrl,
        headers: hader_price
      };
      request.get(opptions, (error, response, body) => {
        body = JSON.parse(body)
        
        
        if (error || response.statusCode !=200 ) {
          console.log("ERROR IN PRODUCT PRICE ", error) 
          console.log(response.statusCode)
          callback()
        } else {
          priceReturn.push({"sku":body[0].Sku , "price" : body[0].price})
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
    cb(null, priceReturn)
  });
}
wegmanProductNutrition = (prodsPrices, cb) => {

  console.log("====================================================================================")
  console.log("====================================================================================")
  console.log("finding Nutrition of products")
  nutriReturn = []
  wegProPriceUrl_b = "https://wegmans-es.azure-api.net/productpublic/products/food/"
  var asyncTasks = [];
  console.log(prodsPrices)
  prodsPrices.forEach(function(item) {

    asyncTasks.push(function(callback) {

      wegProPriceUrl = wegProPriceUrl_b + item.Sku
      var opptions = {
        url: wegProPriceUrl,
        headers: hader
      };
      request.get(opptions, (error, response, body) => {
        body = JSON.parse(body)


        if (error || response.statusCode !=200 ) {
          console.log(response.statusCode)
          console.log("ERROR IN PRODUCT NUTRITION", error)
          callback()
        } else {
          nutriReturn.push({
            'nutri' : body.TradeIdentifierConfigurations[0].TradeIdentifiers[0].Nutrients,
            'sku' : body.Sku,
            'description' : body.Description
          })
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
    console.log("HEREERERERERE", nutriReturn[0])
    cb(null, nutriReturn)
  });
}
getTopVelocity = (produs) => {

  console.log("====================================================================================")
  console.log("====================================================================================")
  console.log("in get top Velocity", produs)
  toLoop = produs.StoreAvailability
  max = 0;
  for (var i = toLoop.length - 1; i >= 0; i--) {
    if (toLoop[i].IsAvailable && toLoop[i].Velocity >= max) {
      reult = toLoop[i];
    
      max = toLoop[i].Velocity
    }
  }
  console.log("return top Velocity", reult)
  return reult;
}
router.get('/nutr', getNutr);
module.exports = router;



// TradeIdentifiers.items.properties




// TradeIdentifierConfigurations[0].TradeIdentifiers