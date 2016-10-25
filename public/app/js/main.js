var crystalApp = angular.module('crystalApp', [])

crystalApp.controller('MainCtrl', ['$scope', function MainCtrl($scope) {
    $scope.response = function(input) {
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
                    $scope.$apply();
                    $scope.response(final)
                    speech = final;
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
    };
}])
