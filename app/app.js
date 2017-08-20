'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.ProfileView',
  'myApp.GroupView',
  'myApp.TaskView',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/profile_view'});
}])
.run(function($location, FIREBASE_CONFIG) {
  let creds = FIREBASE_CONFIG;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL,
    storageBucket: creds.storageBucket,
    messagingSenderId: creds.messagingSenderId
  };
  firebase.initializeApp(authConfig);
});