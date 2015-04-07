'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myAppServices',
  'myAppControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/:genre?', {
      templateUrl: 'views/movies.html',
      controller:  'MoviesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
