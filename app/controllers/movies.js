'use strict';

(function() {
  angular.module('myApp.controllers').
    controller('MoviesCtrl', MoviesController);

  MoviesController.$inject = ['$rootScope', '$scope', '$routeParams', 'Movie', 'TMDBConfig', 'Genre', 'API_CONSTANTS'];

  function MoviesController($rootScope, $scope, $routeParams, Movie, TMDBConfig, Genre, API_CONSTANTS) {
    $scope.paginate   = {};
    $scope.image      = {};
    $scope.GENRES     = [];
    $scope.filter     = { genres: [], page: 1 };

    var in_groups_of = function(data, size) {
      size = size || 3;
      var results = [];

      for(var i = 0, len = data.length; i < len; i += size) {
        results.push(data.slice(i, i + size));
      }

      return results;
    }
    , movies_url = API_CONSTANTS.tmdb.api_url + 'movie/' + ($routeParams.genre || "top_rated")
    , genres_url = API_CONSTANTS.tmdb.api_url + 'genre/movie/list'
    , genre_url  = API_CONSTANTS.tmdb.api_url + 'discover/movie';


    TMDBConfig.get({ api_key: API_CONSTANTS.tmdb.api_key }, function(data) {
      $scope.image = {
        base_url: data.images.base_url,
        backdrop_size: data.images.backdrop_sizes[0]
      };
    });

    //since we would like to trigger the change in own way
    $scope.$watch('filter', fetchMoviesByGenres, true);

    function fetchMoviesByGenres() {
      Genre.find(genre_url, $scope.filter.genres, $scope.filter.page)
        .query(function(data) {
            var nxt, prv;
            $scope.moviesInGroups = in_groups_of(data.results);
            nxt = data.page == data.totalPages ? null : data.page + 1;
            prv = data.page == 1 ? null : data.page -1;

            $scope.paginate = {
              page: data.page,
              nextPage: nxt,
              prevPage: prv,
              totalPages: data.totalPages
            };
        });
    }

    // Movie.trending("tmdb", movies_url).
    //   query(function(data) {
    //     $scope.movies = data.results;
    //     $scope.moviesInGroups = in_groups_of(data.results);
    //   });

    Genre.all(genres_url).
      query(function(data) {
        $scope.GENRES = data.genres;
      });

    if($routeParams.page_id) {
      $scope.filter.page = $routeParams.page_id;
    }
  }

}());
