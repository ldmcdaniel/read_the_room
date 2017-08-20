'use strict';

angular.module('myApp.ProfileView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile_view', {
    templateUrl: 'profile_view/profile_view.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.askingQuestions = 'answering';
  
var user = document.getElementById("users");

    user.addEventListener("change", function(){
        // console.log(user.value);
	$http.get (`https://readtheroom-6b306.firebaseio.com/users/${user.value}.json`)
	.then ((userObj) => {
	$scope.profile = userObj.data;
  })
    });

  // console.log(user.value);
	$http.get (`https://readtheroom-6b306.firebaseio.com/users/${user.value}.json`)
	.then ((userObj) => {
	$scope.profile = userObj.data;
  })
  

	$scope.toggleQuestionView = () => {
		if ($scope.askingQuestions === 'asking') {
			$scope.askingQuestions = 'answering';
		}	else if ($scope.askingQuestions === 'answering') {
			$scope.askingQuestions = 'asking';
		}
	};

	$scope.pts = () => {
		$scope.profile.askPoints += 1;
	};


}]);