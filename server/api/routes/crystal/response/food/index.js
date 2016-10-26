// Food calculator
module.exports.calculate = function(user_info, request_info, callback) {
	console.log("Calculating food nutritional value...")

	// return "The food, " + request_info.food + ", is approximately " + searchFood(request_info.food, getNutritionalInfo() + " kilocalories"
	
	// searchFood(request_info.food, getNutritionalInfo(function(response) {
	// 	console.log(response)
	// 	return "The food, " + request_info.food + ", is approximately " + response + " kilocalories"
	// }))

	// PROMISE --
	searchFood(request_info.food).then(function(response) {
		console.log("Successfully got all info!")
		console.log(response)
		callback("The food, " + request_info.food + ", is approximately " + response.toString() + " kilocalories")
	}, function(err) {
		console.log("Failed!")
		callback("I'm currently having difficulties finding the calories of the " + request_info.food + ". Please ask me again later.")
	})
	//---//
}

var http = require("http");

function searchFood(food){
	return new Promise(function(resolve, reject) {
		console.log("Searching for '"+food+"'...")
		var options = {
		  "method": "GET",
		  "hostname": "api.nal.usda.gov",
		  "port": null,
		  "path": "/ndb/search/?format=json&q="+food+"&sort=n&max=25&offset=0&api_key=SCMSpSwujpUJpHPo2l8UlFj6Eplm1SozFqYa7kdc",
		  "headers": {
		    "cache-control": "no-cache",
		    "postman-token": "42cd4053-60e3-27f4-dbd7-a7a61051cc60"
		  }
		};

		var req = http.request(options, function (res) {
			console.log(res[0])
		  var chunks = [];

		  res.on("data", function (chunk) {
		    chunks.push(chunk);
		  });

		  res.on("end", function () {
		    var body = Buffer.concat(chunks);
		    var parsedBody = JSON.parse(body)
		    // return callback(parsedBody.list.item[0].ndbno)

		    // PROMISE--
		    getNutritionalInfo(parsedBody.list.item[0].ndbno).then(function(response) {
		    	console.log("Successfully got calories!")
		    	resolve(response)
		    }, function(err) {
		    	console.log("Failed to get calories!")
		    	reject("Error getting calories...")
		    })
		    //---//
		  });
		});

		req.end();
	})
}

function getNutritionalInfo(ndbno) {
	return new Promise(function(resolve, reject) {
		console.log("Getting nutritional information of Food #"+ndbno+"...")
		var options = {
		  "method": "GET",
		  "hostname": "api.nal.usda.gov",
		  "port": null,
		  "path": "/ndb/reports/?ndbno="+ndbno+"&type=f&format=json&api_key=SCMSpSwujpUJpHPo2l8UlFj6Eplm1SozFqYa7kdc",
		  "headers": {
		    "cache-control": "no-cache",
		    "postman-token": "eaf441e8-21d6-d418-29d1-1343b5f4a38e"
		  }
		};

		var req = http.request(options, function (res) {
		  var chunks = [];

		  res.on("data", function (chunk) {
		    chunks.push(chunk);
		  });

		  res.on("end", function () {
		    var body = Buffer.concat(chunks);
		    var parsedBody = JSON.parse(body)
		    console.log("Calories of Food #"+ndbno+" is "+parsedBody.report.food.nutrients[0].value)
		    // callback(parsedBody.report.food.nutrients[0].value);
		    resolve(parsedBody.report.food.nutrients[0].value)
		  });
		});

		req.end();
	})
}