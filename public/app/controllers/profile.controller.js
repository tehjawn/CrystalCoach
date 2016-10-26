var crystalApp = angular.module('crystalApp')
crystalApp.controller('ProfileCtrl', ['$scope', '$firebaseObject', function ProfileCtrl($scope, $firebaseObject) {
	// Edit Profile
	$scope.editModeOn = false;
	$scope.editMode = function() {
		$(".profile-form").toggle()
		if ($scope.editModeOn) {
			$("#profile-edit-btn").html('<i class="fa fa-pencil"></i> Edit')
			$("#profile-edit-btn").css({color:'#aaa'})
			$scope.editModeOn = false;
		} else {
			$("#profile-edit-btn").html('<i class="fa fa-book"></i> Save Changes')
			$("#profile-edit-btn").css({color:'green'})
			$scope.editModeOn = true;
		}
	}

	// Firebase Ref
  var ref = firebase.database().ref().child('users').child('john');

  var syncObject = $firebaseObject(ref)
  syncObject.$bindTo($scope, 'user')
}])