var crystalApp = angular.module('crystalApp')
crystalApp.controller('ProfileCtrl', ['$scope', function MainCtrl($scope) {
  $scope.cards = [
  	{
  		title: 1,
  		text: "hihi",
  		date: "something"
  	},
  	{
  		title: 2,
  		text: "hihi",
  		date: "something"
  	},
  	{
  		title: 3,
  		text: "hihi",
  		date: "something"
  	}
  ]
}])