'use strict';

angular.module('myApp.ProfileView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile_view', {
    templateUrl: 'profile_view/profile_view.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', [function() {

}]);