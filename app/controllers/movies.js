'use strict';

(function() {
  angular.module('myApp.Controllers').
    controller('MoviesCtrl',
               ['$rootScope', '$scope', '$routeParams', 'Movie', 'TMDBConfig', 'Genre', 'API_CONSTANTS',
                function($rootScope, $scope, $routeParams, Movie, TMDBConfig, Genre, API_CONSTANTS) {
                  function in_groups_of(data, size) {
                    size = size || 3;
                    var results = [];

                    for(var i = 0, len = data.length; i < len; i += size) {
                      results.push(data.slice(i, i + size))
                    }

                    return results;
                  }

                  $scope.movies  = {}
                  $scope.image   = {}
                  $scope.filter  = {
                    genres: [],
                    rating: null
                  }

                  TMDBConfig.get({ api_key: API_CONSTANTS.tmdb.api_key }, function(data) {
                    $scope.image = {
                      base_url: data.images.base_url,
                      backdrop_size: data.images.backdrop_sizes[0]
                    }
                  });

                  Movie.trending("tmdb", API_CONSTANTS.tmdb.api_url + 'movie/' + ($routeParams.genre || "top_rated")).
                    query(function(data) {
                      $scope.movies = data.results;
                      $scope.moviesInGroups = in_groups_of(data.results)
                    });

                  Genre.all("tmdb",API_CONSTANTS.tmdb.api_url + 'genre/movie/list').
                    query(function(data) {
                      $scope.filter.genres = data.genres;
                    });
                }]);

}());
