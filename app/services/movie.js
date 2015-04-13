'use strict';

(function() {
  angular.module('myApp.services')
    .factory('Movie', MovieFactory);

  MovieFactory.$inject = ['$resource', '$rootScope', 'API_CONSTANTS']

  function MovieFactory($resource, $rootScope, API_CONSTANTS) {
    var fetchMovies = function(url, api_key, page) {
      return $resource(url,
                       {
                         api_key: api_key
                       },
                       {
                         query: {
                           method: 'GET'
                         }
                       })
    }
    return {
      trending: function(domain, url, page) {
        return fetchMovies(url, API_CONSTANTS[domain].api_key, page || 1)
      }
    }
  }
}());
