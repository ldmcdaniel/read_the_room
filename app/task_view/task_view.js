'use strict';

angular.module('myApp.TaskView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/group_view', {
    templateUrl: 'task_view/task_view.html',
    controller: 'GroupCtrl'
  });
}])

.controller('GroupCtrl', [function() {

}]);