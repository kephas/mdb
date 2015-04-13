'use strict';

(function() {
  angular.module('myApp.Services')
    .factory('TMDBConfig', TMDBConfiguration);

  TMDBConfiguration.$inject = ['$resource', 'API_CONSTANTS']

  function TMDBConfiguration($resource, API_CONSTANTS) {
    return $resource(API_CONSTANTS.tmdb.api_url + "configuration",
                     {},
                     { query: {
                       method: 'GET'
                     }
                     });
    }
}());
