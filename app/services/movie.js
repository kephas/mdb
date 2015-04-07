'use strict';

(function() {
  angular.module('myAppServices', ['ngResource'])
    .factory('Movie', ['$resource', '$rootScope', function($resource, $rootScope) {
      return {
        trending: function(url, page) {
          return $resource(url,
                           { api_key: $rootScope.api_key },
                           { query:
                             { method: 'GET' }
                           })
        }
      };
    }]);
}());
