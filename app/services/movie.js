'use strict';

(function() {
  angular.module('myAppServices')
    .factory('Movie', ['$resource', '$rootScope', function($resource, $rootScope) {
      return {
        trending: function(url, page) {
          return $resource(url,
                           { api_key: $rootScope.api.key },
                           { query:
                             { method: 'GET' }
                           })
        }
      };
    }]);
}());
