'use strict';

(function() {
  angular.module('myAppControllers', ['myAppServices']).
    controller('MoviesCtrl', [ '$rootScope', '$scope', 'Movie', 'Config', function($rootScope, $scope, Movie, Config) {
      $scope.movies      = {};
      $scope.image       = {};
      $scope.url         = { pathname: 'movie/top_rated' };
      $rootScope.api_key = "2e329c92227ed8be07944ae447c9426f";
      $rootScope.api_url = "https://api.themoviedb.org/3/";

      Config.get({ api_key: $rootScope.api_key }, function(data) {
        $scope.image = {
          base_url: data.images.base_url,
          backdrop_size: data.images.backdrop_sizes[0]
        }
      });

      Movie.trending($rootScope.api_url + $scope.url.pathname)
        .query(function(data) {
          $scope.movies = data.results;
        });
    }])

}());
