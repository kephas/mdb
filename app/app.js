'use strict';

var API_CONSTANTS = {
  tmdb : {
    api_key: "2e329c92227ed8be07944ae447c9426f",
    api_url: "https://api.themoviedb.org/3/",
  },
  omdb: {
    api_key: "f3a671f8",
    api_url: "www.omdbapi.com"
  }
}

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Services',
  'myApp.Controllers'
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
  }]).
  constant('API_CONSTANTS', API_CONSTANTS);
