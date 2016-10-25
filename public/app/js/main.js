var crystalApp = angular.module('crystalApp', [])

crystalApp.controller('responseCtrl', ['$scope'] function responseCtrl($scope) {
    $scope.response = function() {
        responsiveVoice.speak("Chet you scrub")
    }
})

crystalApp.controller('speechCtrl', ['$scope'] function speechCtrl($scope) {
    $scope.speech = function() {
        var rec = new webkitSpeechRecognition();
        var interim = [];
        var final = '';

        rec.continuous = false;
        rec.lang = 'en-US';
        rec.interimResults = true;
        rec.onerror = function(event) {
            console.log('error!');
        };

        start = function() {
            rec.start();
        };

        rec.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    final = final.concat(event.results[i][0].transcript);
                    console.log(event.results[i][0].transcript);
                    $scope.$apply();
                } else {
                    interim.push(event.results[i][0].transcript);
                    console.log('interim ' + event.results[i][0].transcript);
                    $scope.$apply();
                }
            }
        }
    }

})
