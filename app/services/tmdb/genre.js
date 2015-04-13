'use strict';

(function() {
  angular.module('myApp.services').
    factory('Genre', Genre);

  Genre.$inject = ['$resource', '$rootScope'];


  function Genre($resource, $rootScope) {
    return {
      all: function(url) {
        return $resource(url,
                         {
                           api_key: API_CONSTANTS.tmdb.api_key
                         },
                         {
                           query: {
                             method: 'GET'
                           }
                         }
                        );
      },

      find: function(url, genre_ids, page) {
        return $resource(url,
                         {
                           with_genres: genre_ids.join(","),
                           api_key: API_CONSTANTS.tmdb.api_key,
                           page: page || 1
                         },
                         {
                           query: {
                             method: 'GET'
                           }
                         });
      }
    };
  }
}());
