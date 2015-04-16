'use strict';

(function() {
  angular.module('myApp.controllers')
    .controller('ReviewsCtrl', ReviewsController)

  ReviewsController.$inject = ['$scope', '$routeParams', 'API_CONSTANTS', 'Movie', 'TMDBConfig', 'SavedState'];

  function ReviewsController($scope, $routeParams, API_CONSTANTS, Movie, TMDBConfig, SavedState) {
    var savedData = SavedState.getState();

    $scope.movie = {};
    $scope.image = savedData.image;

    var overview_url = API_CONSTANTS.tmdb.api_url + "movie/" + $routeParams.movie_id
    , reviews_url = API_CONSTANTS.tmdb.api_url + 'movie/' + $routeParams.movie_id + '/reviews';

    // Review.fetch(reviews_url)
    //   .query(function(data) {
    //     $scope.movie.review = {
    //       author: data.results[0].author,
    //       content: data.results[0].content
    //     }
    //   });

    /* to do doesn't get triggered second time
       * has to be triggered with watch, idk
     */
    $scope.movie.paginate = function(p_or_n){
      return savedData.movie_ids && savedData.movie_ids[savedData.movie_ids.indexOf($routeParams.movie_id) + p_or_n]
    }

    Movie.overview("tmdb", overview_url)
      .query(function(data) {
        $scope.movie.overview = data;
      });
  }
}());
