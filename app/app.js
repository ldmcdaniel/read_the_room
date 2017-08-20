'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.ProfileView',
  'myApp.GroupView',
  'myApp.version',
  
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  // $routeProvider.otherwise({redirectTo: '/profile_view'});
}]);
