var express = require('express');
var router = express.Router();
var request = require('request');
var async = require("async");
var hader_price = {
          authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL3dlZ21hbnMtZXMuYXp1cmUtYXBpLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0Zi8iLCJpYXQiOjE1MTcxMzE1NDQsIm5iZiI6MTUxNzEzMTU0NCwiZXhwIjoxNTE3MTM1NDQ0LCJhaW8iOiJZMk5nWU1pNGNFZE54eWlWUzA1VGpmTlZiRk1aQUE9PSIsImFwcGlkIjoiMmZhOGY3MWYtY2VjNS00OWU5LWJkMGEtMjI3ODBkYzI2YTliIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMTMxOGQ1N2YtNzU3Yi00NWIzLWIxYjAtOWIzYzM4NDI3NzRmLyIsIm9pZCI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInN1YiI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInRpZCI6IjEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0ZiIsInV0aSI6InRYbkZCTlk4ZjBpbEV0azZ1dTBSQUEiLCJ2ZXIiOiIxLjAifQ.b8WT1OUmJhg0pA4a-KIMHUJxUjXk_EhRmZhh_yRrxr0OqCGp3IPuCH5JOI3RgFJgAnW9WLjw3o_Y64rPEuz7Jh6ejrWLBuNsmWDX40VuepLvyrj-CHtBJFOWvffWQLYSav4gCN_CSWGDuVJoeTzBWJGfbD_hRtMECP1sSGmpWVO82bU8SVvpftkgrE40ZwmPwXmR9tub_lcWHYoIig3JDsNIYsuyd1pDtUAAjee2-r3o4MCV-syM-q2XXFeRbL7qzunyGmYT23Y_AeSiX6CCax9y5u-D0pfMp42tqgpQ3BvhCr5CArwQ7V-DRld78K6dgrmuIYwUSRFsKv2OCZdVmQ',
          'price-subscription-key': 'd015e7735fdf44e89273289d5ef2814e'
        }
var hader = {
          authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL3dlZ21hbnMtZXMuYXp1cmUtYXBpLm5ldCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0Zi8iLCJpYXQiOjE1MTcxMzE1NDQsIm5iZiI6MTUxNzEzMTU0NCwiZXhwIjoxNTE3MTM1NDQ0LCJhaW8iOiJZMk5nWU1pNGNFZE54eWlWUzA1VGpmTlZiRk1aQUE9PSIsImFwcGlkIjoiMmZhOGY3MWYtY2VjNS00OWU5LWJkMGEtMjI3ODBkYzI2YTliIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMTMxOGQ1N2YtNzU3Yi00NWIzLWIxYjAtOWIzYzM4NDI3NzRmLyIsIm9pZCI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInN1YiI6ImY0NTIwYmRmLTc1NWItNGY5Yi1iNWJkLTI4NGJiYTI2MTEwOSIsInRpZCI6IjEzMThkNTdmLTc1N2ItNDViMy1iMWIwLTliM2MzODQyNzc0ZiIsInV0aSI6InRYbkZCTlk4ZjBpbEV0azZ1dTBSQUEiLCJ2ZXIiOiIxLjAifQ.b8WT1OUmJhg0pA4a-KIMHUJxUjXk_EhRmZhh_yRrxr0OqCGp3IPuCH5JOI3RgFJgAnW9WLjw3o_Y64rPEuz7Jh6ejrWLBuNsmWDX40VuepLvyrj-CHtBJFOWvffWQLYSav4gCN_CSWGDuVJoeTzBWJGfbD_hRtMECP1sSGmpWVO82bU8SVvpftkgrE40ZwmPwXmR9tub_lcWHYoIig3JDsNIYsuyd1pDtUAAjee2-r3o4MCV-syM-q2XXFeRbL7qzunyGmYT23Y_AeSiX6CCax9y5u-D0pfMp42tqgpQ3BvhCr5CArwQ7V-DRld78K6dgrmuIYwUSRFsKv2OCZdVmQ',
          'product-subscription-key': 'd015e7735fdf44e89273289d5ef2814e'
        }
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
    "zone": 4,
    "fg": ["0900", "1100", "0100", "0800"] //veggies -1100 - baked products -1800, breakfast cereals - 0800, dairy eggs - 0100, fruits juices - 0900, 
  }
  urrrl = "https://api.nal.usda.gov/ndb/nutrients/?subset=1&max=20&sort=c&format=json&api_key=DEMO_KEY"
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
      console.log("1ast",body)
      bodyObj = body.report.foods
      fdaList = [];
      for (key in bodyObj) {
        fdaList.push(bodyObj[key].name)
      }
      wegmanProductSearch(fdaList, function(err, product_data){
        wegmanProductAvail(product_data, function(err, avail_data){
        
          wegmanProductPrice(avail_data, function(err, data){
          
            res.send(data)

          })

        })
        

      })
    }
  }
  request.get(urrrl, responseHandle)
}
wegmanProductSearch = (fdaList, cb) => {
  console.log("Searching Products")
  skuReturn = []
  wegProSearchUrl_b = "https://wegmans-es.azure-api.net/productpublic/products/search?criteria="

  var asyncTasks = [];
  // Loop through some items
  fdaList.forEach(function(item) {
    console.log(item)
    asyncTasks.push(function(callback) {
      wegProSearchUrl = wegProSearchUrl_b + item
      ssss = "Product-Subscription-Key"
      var options = {
        url: wegProSearchUrl,
        headers: hader
      };
      request.get(options, (error, response, body) => {
        
        if (error) {
          console.log(error)
          skuReturn.push(error)
          callback()
        } else {
          body = JSON.parse(body)
          console.log(body);
          bodyItem = body.Results[0]
        
          skuReturn.push(bodyItem)
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
     cb(null,skuReturn)
  });
}
wegmanProductAvail = (products, cb) => {
  console.log("Calculating Product Prices")
  
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
        
        if (error) {
          availReturn.push(error)
          callback()
        } else {
          if(body.IsChainAvailable){
            // console.log(body)
            finalBody = getTopVelocity(body)
            // availReturn.push(body.StoreAvailability[0])
            availReturn.push(body.finalBody)
          }
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
     cb(null,availReturn)
  });
}

wegmanProductPrice = (availProds, cb) => {
  priceReturn = []
  wegProPriceUrl_b = "https://wegmans-es.azure-api.net/pricepublic/pricing/current_prices/"
  var asyncTasks = [];
  availProds.forEach(function(item) {

    asyncTasks.push(function(callback) {
      wegProPriceUrl = wegProPriceUrl_b + item.Sku +"/"+ item.StoreNumber
      var opptions = {
        url: wegProPriceUrl,
        headers: hader_price 
      };

      request.get(opptions, (error, response, body) => {
        body = JSON.parse(body)
              // console.log(body)

        if (error) {
          priceReturn.push(error)
          callback()
        } else { 
          priceReturn.push(body)
          callback()
        }
      })
    });
  });
  async.parallel(asyncTasks, function() {
     cb(null,priceReturn)
  });
}
getTopVelocity = (produs)=>{
  toLoop = produs.StoreAvailability
  max = 0;
  for (var i = toLoop.length - 1 ; i >=0 ; i--) {
  
    if(toLoop[i].IsAvailable && toLoop[i].Velocity > max )
      reult = toLoop[i];
      max = toLoop[i].Velocity
    }
  return reult ;
}
router.get('/nutr', getNutr);
module.exports = router;