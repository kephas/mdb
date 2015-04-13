'use strict';

(function() {
  angular.module('myAppControllers').
    controller('MoviesCtrl', [ '$rootScope', '$scope', '$routeParams', 'Movie', 'Config', 'Genre', function($rootScope, $scope, $routeParams, Movie, Config, Genre) {
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
      $rootScope.api = {
        key: "2e329c92227ed8be07944ae447c9426f",
        url: "https://api.themoviedb.org/3/"
      }

      Config.get({ api_key: $rootScope.api.key }, function(data) {
        $scope.image = {
          base_url: data.images.base_url,
          backdrop_size: data.images.backdrop_sizes[0]
        }
      });

      Movie.trending($rootScope.api.url + 'movie/' + ($routeParams.genre || "top_rated")).
        query(function(data) {
          $scope.movies = data.results;
          $scope.moviesInGroups = in_groups_of(data.results)
        });
      Genre.all($rootScope.api.url + 'genre/movie/list').
        query(function(data) {
          $scope.filter.genres = data.genres;
        });
    }]);

}());
