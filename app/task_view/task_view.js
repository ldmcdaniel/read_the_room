'use strict';

angular.module('myApp.TaskView', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/group_view', {
//     templateUrl: 'task_view/task_view.html',
//     controller: 'TaskCtrl'
//   });
// }])

.controller('TaskCtrl', ['$scope', '$q', '$http', 'FIREBASE_CONFIG', function($scope, $q, $http, FIREBASE_CONFIG) {

  let userId = 'user1';
  // let userId = UserFactory.getUser();

  $scope.taskList = {};
  // $scope.taskList.task1 = {'question': "question 1",
  //                           'answer': "answer 1"};
  // $scope.taskList.task2 = {'question': "question 2",
  //                           'answer': "answer 2"};
  // $scope.taskList.task3 = {'question': "question 3",
  //                           'answer': "answer 3"};
  // $scope.taskList.task4 = {'question': "question 4",
  //                           'answer': "answer 4"};

  $scope.allAnswers = [];

  let questions = [];

  // Method to retrieve all the given user's answered questions
  let getUsersAnswers = function (user) {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/answers.json?orderBy="uid"&equalTo="${user}"`)
      .then((successObj)=>{
  console.log("getAllAnswers success: ", successObj);
        resolve(successObj);
      }, (error)=>{
        reject(error);
      });
    });
  };

  // let userAnswers = getUsersAnswers(userId);

  // method to build an array of question ids
  let questionCollate = function (answers) {
    let qArray = [];
    for (let answer in answers) {
console.log("qArray Answer: ", answer);
      qArray.push(answers[answer].qid);
    }
console.log("questionCollate qarray: ", qArray);
      return qArray;
  };

  // let questionArray = questionCollate(userAnswers);

  // method to retrieve all answers that match a list of qids
  let getAnsweredQuestions = function () {
    return new $q( (resolve, reject)=> {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/answers.json?`)
      .then((successObj)=>{
  console.log("getAllAnswers success: ", successObj);
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
  console.log("getAllAnswers success: ", successObj);
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
  console.log("getTasks success: ", successObj);
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
  console.log("getTasks success: ", successObj);
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
          console.log("outer", success);
          $scope.allAnswers = success;
          getUsersAnswers(userId)
          .then((success)=>{
            console.log("inner", success.data);
            $scope.userAnswers = success.data;
            questions = questionCollate($scope.userAnswers);
            console.log($scope.allAnswers);
            for (let answer in $scope.userAnswers) {
              for (let ans in $scope.allAnswers) {
                if ($scope.userAnswers[answer].qid !== $scope.allAnswers[ans].qid) {
                  // do nothing;
                } else {
                  $scope.taskList[answer] = $scope.allAnswers[answer];
                  $scope.taskList[answer].title = $scope.allQuestions[$scope.allAnswers[answer].qid].questionString;
                  $scope.taskList[answer].author = $scope.allUsers[$scope.allAnswers[ans].uid].name;
                }
              }
            }
          });
        });
      });
    });
  });

  $scope.setComplete = function(ansId) {

  };

}]);