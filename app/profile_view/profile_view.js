'use strict';

angular.module('myApp.ProfileView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile_view', {
    templateUrl: 'profile_view/profile_view.html',
    controller: 'ProfileCtrl'
  });
}])
.controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get ('https://readtheroom-6b306.firebaseio.com/users/user0.json')
	.then ((userObj) => {
	$scope.profile = userObj.data;
	})

}]);