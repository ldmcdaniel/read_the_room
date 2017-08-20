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

	$http.get ('https://readtheroom-6b306.firebaseio.com/users/user0.json')
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




}]);