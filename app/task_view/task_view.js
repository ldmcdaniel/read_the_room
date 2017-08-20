'use strict';

angular.module('myApp.TaskView', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/group_view', {
//     templateUrl: 'task_view/task_view.html',
//     controller: 'TaskCtrl'
//   });
// }])

.controller('TaskCtrl', ['$scope', '$q', '$http', 'FIREBASE_CONFIG', function($scope, $q, $http, FIREBASE_CONFIG) {

  let userId = 'user0';
  // let userId = UserFactory.getUser();

  $scope.taskList = {};

  $scope.allAnswers = [];

  let questions = [];

  // Method to retrieve all the given user's answered questions
  let getUsersAnswers = function (user) {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/answers.json?orderBy="uid"&equalTo="${user}"`)
      .then((successObj)=>{
        resolve(successObj);
      }, (error)=>{
        reject(error);
      });
    });
  };

  // method to build an array of question ids
  let questionCollate = function (answers) {
    let qArray = [];
    for (let answer in answers) {
      qArray.push(answers[answer].qid);
    }
      return qArray;
  };

  // method to retrieve all answers that match a list of qids
  let getAnsweredQuestions = function () {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/answers.json?`)
      .then((successObj)=>{
        resolve(successObj.data);
      }, (error)=>{
        reject(error);
      });
    });
  };

  let getQuestions = function () {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/questions.json?`)
      .then((successObj)=>{
        resolve(successObj.data);
      }, (error)=>{
        reject(error);
      });
    });
  };

  let getUsersTasks = function (user) {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/tasks.json?orderBy="uid"&equalTo="${user}"`)
      .then((successObj)=>{
        resolve(successObj);
      }, (error)=>{
        reject(error);
      });
    });
  };

  let getUsers = function () {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?`)
      .then((successObj)=>{
        resolve(successObj.data);
      }, (error)=>{
        reject(error);
      });
    });
  };

  getUsers()
  .then((success)=>{
    $scope.allUsers = success;
    getQuestions()
    .then((success)=>{
      $scope.allQuestions = success;
      getUsersTasks(userId)
      .then((success)=>{
        $scope.userTasks = success.data;
        getAnsweredQuestions()
        .then((success)=> {
          $scope.allAnswers = success;
          getUsersAnswers(userId)
          .then((success)=>{
            $scope.userAnswers = success.data;
            questions = questionCollate($scope.userAnswers);
            for (let answer in $scope.userAnswers) {
              for (let ans in $scope.allAnswers) {
                if ($scope.userAnswers[answer].qid !== $scope.allAnswers[ans].qid || $scope.allAnswers[ans].uid === userId) {
                  // do nothing;
                } else {
console.log('scope:', $scope);
                  $scope.user = $scope.allUsers[userId];
                  $scope.taskList[answer] = $scope.allAnswers[answer];
                  $scope.taskList[answer].title = $scope.allQuestions[$scope.allAnswers[answer].qid].questionString;
                  $scope.taskList[answer].author = $scope.allUsers[$scope.allAnswers[ans].uid].name;
                  $scope.taskList[answer].myAnswer = $scope.allQuestions[$scope.allAnswers[answer].qid][$scope.allAnswers[answer].userAnswer];
                }
              }
            }
          });
        });
      });
    });
  });

  $scope.setComplete = function(ansId) {
console.log("setComplete called with: ", ansId);
  let answerId = "";
  for (let question in $scope.allQuestions) {
    if ($scope.allQuestions[question].questionString === ansId) {
      for (let answer in $scope.userAnswers){
        if ($scope.userAnswers[answer].qid === ansId)
          answerId = answer;
      }
    }
  }
  let userTask = {'answerID': answerId,
                  'uid': userId };
  document.getElementById(ansId).remove();

    return new $q( (resolve, reject)=> {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/tasks.json?`, angular.toJson(userTask))
      .success((successObj)=>{
console.log("setcomplete success: ", successObj);
        resolve(successObj);
      })
      .error((error)=>{
console.log("error: ", error);
        reject(error);
      });
    });
  };


}]);