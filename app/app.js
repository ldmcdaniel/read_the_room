'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.ProfileView',
  'myApp.GroupView',
  'myApp.TaskView',
  'myApp.version',
  'myApp.QuestionView',
  'myApp.version',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/profile_view'});
}])
.run(['$location', 'FIREBASE_CONFIG', function($location, FIREBASE_CONFIG) {
  let creds = FIREBASE_CONFIG;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL,
    storageBucket: creds.storageBucket,
    messagingSenderId: creds.messagingSenderId
  };
}]);
