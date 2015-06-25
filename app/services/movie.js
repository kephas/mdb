'use strict';

(function() {
  angular.module('myAppServicesMovie', ['ngResource'])
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
