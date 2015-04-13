'use strict';

(function() {
  angular.module('myApp.controllers').
    controller('MoviesCtrl', MoviesController);

  MoviesController.$inject = ['$rootScope', '$scope', '$routeParams', 'Movie', 'TMDBConfig', 'Genre', 'API_CONSTANTS']

  function MoviesController($rootScope, $scope, $routeParams, Movie, TMDBConfig, Genre, API_CONSTANTS) {
    $scope.movies  = {}
    $scope.image   = {}
    $scope.filter  = {
      genres: [],
      rating: null
    }

    var in_groups_of = function(data, size) {
      size = size || 3;
      var results = [];

      for(var i = 0, len = data.length; i < len; i += size) {
        results.push(data.slice(i, i + size))
      }

      return results;
    }
    , movies_url = API_CONSTANTS.tmdb.api_url + 'movie/' + ($routeParams.genre || "top_rated")
    , genres_url = API_CONSTANTS.tmdb.api_url + 'genre/movie/list';


    TMDBConfig.get({ api_key: API_CONSTANTS.tmdb.api_key }, function(data) {
      $scope.image = {
        base_url: data.images.base_url,
        backdrop_size: data.images.backdrop_sizes[0]
      }
    });

    Movie.trending("tmdb", movies_url).
      query(function(data) {
        $scope.movies = data.results;
        $scope.moviesInGroups = in_groups_of(data.results)
      });

    Genre.all("tmdb", genres_url).
      query(function(data) {
        $scope.filter.genres = data.genres;
      });
  }

}());
