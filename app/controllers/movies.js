'use strict';

(function() {
  angular.module('myAppControllers', ['myAppServicesMovie', 'myAppServicesConfig']).
    controller('MoviesCtrl', [ '$rootScope', '$scope', '$routeParams', 'Movie', 'Config', function($rootScope, $scope, $routeParams, Movie, Config) {
      $scope.movies  = {}
      $scope.image   = {}
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

      Movie.trending($rootScope.api.url + 'movie/' + ($routeParams.genre || "top_rated"))
        .query(function(data) {
          $scope.movies = data.results;
        });
    }]);

}());
