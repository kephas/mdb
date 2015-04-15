
  'use strict';

(function() {
  angular.module('myApp.services')
    .factory('TMDBConfig', TMDBConfiguration);

  TMDBConfiguration.$inject = ['$resource', 'API_CONSTANTS'];

  function TMDBConfiguration($resource, API_CONSTANTS) {
    var fetchConfig = function(url) {
        return $resource(url,
                     {
                       api_key: API_CONSTANTS.tmdb.api_key
                     },
                     { query: {
                       method: 'GET'
                     }
                     });
    };

    return {
      fetch: fetchConfig
    };
  }
}());
