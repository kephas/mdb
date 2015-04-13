'use strict';

(function() {
  angular.module('myAppServices').
    factory('Genre', Genre);

  Genre.$inject = ['$resource', '$rootScope'];


  function Genre($resource, $rootScope) {
    return {
      all: function(url) {
        return $resource(url,
                         {
                           api_key: $rootScope.api.key
                         },
                         {
                           query: {
                             method: 'GET'
                           }
                         }
                        )
      },

      find: function(url, genre_ids) {
        return $resource(url,
                         {
                           api_key: $rootScope.api.key
                         },
                         {
                           query: {
                             method: 'GET',
                             params: {
                               with_genres: genre_ids.join(",")
                             }
                           }
                         }
                        )
      }
    }
  }

}());
