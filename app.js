/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
  request = require('request'),

_ = require('lodash');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      latitude:req.query.latitude,
      longitude:req.query.longitude
     };
                     
      var callURL = "https://d8d775bd-d009-4709-b9f5-e0da76a5ebc6:ukxwFlxUKf@twcservice.mybluemix.net/api/weather/v1/geocode/"+response.latitude+"/"+response.longitude+"/forecast/hourly/48hour.json?units=m&language=en-US"

      request.get(callURL, {
        json: true
      },
      function (error, response, body) {
		if(error){
			console.log(error);
		} else {
			var meta = body["metadata"];
			var id = meta["transaction_id"]
			res.send(id);
		}

      });
})


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
