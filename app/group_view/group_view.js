'use strict';

angular.module('myApp.GroupView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/group_view', {
    templateUrl: 'group_view/group_view.html',
    controller: 'GroupCtrl'
  });
}])

.controller('GroupCtrl', [function() {

}]);