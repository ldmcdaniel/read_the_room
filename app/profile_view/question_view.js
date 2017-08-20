'use strict';

angular.module('myApp.QuestionView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question_view', {
    templateUrl: 'profile_view/question_view.html',
    controller: 'QuestionCtrl'
  });
}])

.controller('QuestionCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get ('https://readtheroom-6b306.firebaseio.com/users/user0.json')
  .then ((userObj) => {
  $scope.profile = userObj.data;
  var mypoints = $scope.profile.askPoints;
  });

  $scope.pts = function(){
    $scope.profile.askPoints += 1;
    // console.log($scope.profile.askPoints);
  };
  // console.log("what's scope", mypoints);
}]);
