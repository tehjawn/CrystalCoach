var crystalApp = angular.module('crystalApp')
crystalApp.controller('HomeCtrl', ['$scope', function HomeCtrl($scope) {
  $scope.cards = [
  	{
  		title: "Xiao has a new Pushups Record!",
  		text: "46 of them to be exact! Congratulate Xiao for breaking his record!",
  		date: "Oct 26 2016",
      image: "celebrate.jpg"
  	},
  	{
  		title: "Upcoming Race Weekend in Philly",
  		text: "In just a few weeks, the Philadelphia Marathon will be taking place! Register for the event today!",
  		date: "Oct 24 2016",
      image: "marathon.jpg",
      url: "http://philadelphiamarathon.com/"
  	},
  	{
  		title: "CrystalCoach Alpha v0.1 Launches!",
  		text: "Welcome to the CrystalCoach platform. We're currently in our alpha stages of development, so be wary of bugs - if you find any, please report them to us at bugs@crystalcoach.me. Thank you!",
  		date: "Oct 23 2016",
      image: "cc.jpg"
  	}
  ]
  $scope.openURL = function(url){
    window.open(url)
    console.log(url)
  }
}])