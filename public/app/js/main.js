var crystalApp = angular.module('crystalApp', [])

crystalApp.controller('MainCtrl', function MainCtrl($scope) {
	$scope.response = function () {
		responsiveVoice.speak("Chet you scrub")
	}
})

crystalApp.controller('MainCtrl', function MainCtrl($scope) {
	$scope.speech = function () {
		recognizer.start();
	}
})
