'use strict';

(function() {
  angular.module('myApp.controllers').
    controller('MoviesCtrl', MoviesController);

  MoviesController.$inject = ['$rootScope', '$scope', '$routeParams', 'Movie', 'TMDBConfig', 'Genre', 'SavedState', 'API_CONSTANTS'];

  function MoviesController($rootScope, $scope, $routeParams, Movie, TMDBConfig, Genre, SavedState, API_CONSTANTS) {
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
    , clamp_values = function(value) {
        if(value < 6)
          return 1;
        else if(value % 5 == 0)
          return 5;
        else
          //Math.round( (value % 5) * 10 ) / 10;
          return Math.round(value % 5);
    }
    , config_url = API_CONSTANTS.tmdb.api_url + "configuration"
    , movies_url = API_CONSTANTS.tmdb.api_url + 'movie/' + ($routeParams.genre || "top_rated")
    , genres_url = API_CONSTANTS.tmdb.api_url + 'genre/movie/list'
    , genre_url  = API_CONSTANTS.tmdb.api_url + 'discover/movie';


    TMDBConfig.fetch(config_url).query(function(data) {
      $scope.image = {
        base_url: data.images.base_url,
        backdrop_size: data.images.backdrop_sizes[0]
      };
      SavedState.setState({image: $scope.image});
    });

    //since we would like to trigger the change in own way
    $scope.$watch('filter', fetchMoviesByGenres, true);

    function fetchMoviesByGenres() {
      Genre.find(genre_url, $scope.filter.genres, $scope.filter.page)
        .query(function(data) {
            var nxt, prv;
            angular.forEach(data.results, function(result) {
              result.vote_average = clamp_values(result.vote_average);
            });
            $scope.moviesInGroups = in_groups_of(data.results);
            nxt = data.page == data.totalPages ? null : data.page + 1;
            prv = data.page == 1 ? null : data.page -1;

            $scope.paginate = {
              page: data.page,
              nextPage: nxt,
              prevPage: prv,
              totalPages: data.totalPages
            };

          SavedState.setState({movie_ids: data.results.map(function(movie) { return movie.id; })});
        });
    }

    /* to do
     * gets overriden by the $scope.$watch */
    Movie.trending("tmdb", movies_url).
      query(function(data) {
        $scope.movies = data.results;
        $scope.moviesInGroups = in_groups_of(data.results);
      });

    Genre.all(genres_url).
      query(function(data) {
        $scope.GENRES = data.genres;
      });

    if($routeParams.page_id) {
      $scope.filter.page = $routeParams.page_id;
    }
  }

}());
