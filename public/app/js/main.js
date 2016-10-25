var crystalApp = angular.module('crystalApp', [])

crystalApp.controller('MainCtrl', ['$scope', '$http', function MainCtrl($scope, $http) {
    $scope.response = function(input) {
        $scope.userSaid = input
        responsiveVoice.speak(input)
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
    	$http.get('./json/test.json').
    success(function(data, status, headers, config) {
      $scope.inspire = data;
      $scope.response(data.quote + " Quoted by " +data.name)
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    }
}])
