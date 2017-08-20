'use strict';

angular.module('myApp.TaskView', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/group_view', {
//     templateUrl: 'task_view/task_view.html',
//     controller: 'TaskCtrl'
//   });
// }])

.controller('TaskCtrl', ['$scope', function($scope) {

  $scope.taskList = {};
  $scope.taskList.task1 = {'question': "question 1",
                            'answer': "answer 1"};
  $scope.taskList.task2 = {'question': "question 2",
                            'answer': "answer 2"};
  $scope.taskList.task3 = {'question': "question 3",
                            'answer': "answer 3"};
  $scope.taskList.task4 = {'question': "question 4",
                            'answer': "answer 4"};

}]);