var crystalApp = angular.module('crystalApp', ['ngRoute', 'firebase'])

// ASK CHET ABOUT SERVICES IN ANGULAR <-- We will need to have Firebase User Information as a service

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './views/home.view.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
    .when('/xiao', {
      templateUrl: './views/xiao.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/settings', {
      templateUrl: './views/settings.view.html',
      controller: 'SettingsCtrl',
      controllerAs: 'settings'
    })
    .when('/profile', {
      templateUrl: './views/profile.view.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile'
    })
    .when('/stats', {
      templateUrl: './views/stats.view.html',
      controller: 'StatsCtrl',
      controllerAs: 'stats'
    })
    .otherwise({
      redirectTo: '/'
    })

  // TODO : Otherwise is currently NOT WORKING! Ask around about this.

  $locationProvider.html5Mode(true)
}])

crystalApp.controller('MainCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', function MainCtrl($scope, $http, $route, $routeParams, $location) {
  this.$route = $route
  this.$location = $location
  this.$routeParams = $routeParams

  $scope.response = function(input) {
    console.log("Saying '"+input+"'...")
    $scope.userSaid = input
    responsiveVoice.speak(input)
  }

  $scope.goTo = function(loc) {
    $location.url(loc)
    $('#menu-open').attr('checked', false);
  }

  $scope.rec

  $scope.stopListening = function() {
    console.log("Stop listen")
    $scope.rec.stop();
    $(".mic-overlay").fadeOut();
    $('#menu-open').attr('checked', false);
  }

  $scope.listen = function() {

    var obj = document.createElement("audio");
    obj.src = "https://kahimyang.com/resources/sound/click.mp3";
    obj.volume = 1;

    obj.play();

    $(".mic-overlay").fadeIn();
    var result;
    $scope.rec = new webkitSpeechRecognition();
    var interim = [];
    var final = '';

    $scope.rec.continuous = false;
    $scope.rec.lang = 'en-US';
    $scope.rec.interimResults = true;

    $scope.rec.onerror = function(event) {
      console.log('error!');
    };

    $scope.rec.start();

    $scope.rec.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final = final.concat(event.results[i][0].transcript);
          console.log(event.results[i][0].transcript);

          // $scope.response(final)
          var crystalRes = $scope.askCrystal(final, $scope.response)
          
          // $scope.$apply();
        } else {
          interim.push(event.results[i][0].transcript);
          console.log('interim ' + event.results[i][0].transcript);
          $(".mic-overlay").fadeOut();
          $("#speech").text(result);
        }
      }
    }
  }

  $scope.speech = function() {
    console.log("Starting speech recognition...")
    var rec = new webkitSpeechRecognition();
    var interim = [];
    var final = '';

    rec.continuous = false;
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.onerror = function(event) {
      console.log('error!');
    };

    rec.start();

    rec.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final = final.concat(event.results[i][0].transcript);
          console.log(event.results[i][0].transcript);

          $scope.response(final)
          $scope.$apply();
        } else {
          interim.push(event.results[i][0].transcript);
          console.log('interim ' + event.results[i][0].transcript);
          $scope.$apply();
        }
      }
    }
  }

  $scope.text = 'CRYSTAL WILL SAY WHATEVER YOU WANT';
  $scope.submit = function() {
    if ($scope.text) {
      $scope.response(this.text)
      $scope.text = '';
    }
  }

  $scope.iQuote = function() {
    $http.get('./json/quotes.json').
    success(function(data, status, headers, config) {
      console.log(data)
      $scope.inspire = data.quotes[Math.floor(Math.random() * 101)];
      $scope.response($scope.inspire[0] + " Quoted by " + $scope.inspire[1])
    }).
    error(function(data, status, headers, config) {
      // log error
      console.log("error!")
    });
  }

  $scope.askCrystal = function(input, callback) {
    console.log("Asking Crystal '" + input + "'...")
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8000/crystal/listen",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "17e7252c-8e8a-2bf7-dd09-40088c042fe5"
      },
      "processData": false,
      "data": "{\n    \"userInput\" : \""+input+"\"\n}"
    }

    $.ajax(settings).done(function(response) {
      callback(response.message)
    });
  }
}])
