'use strict';

(function() {
  angular.module('myApp.Services')
    .factory('Movie', ['$resource', '$rootScope', 'API_CONSTANTS', function($resource, $rootScope, API_CONSTANTS) {
      return {
        trending: function(domain, url, page) {
          return $resource(url,
                           {
                             api_key: API_CONSTANTS[domain].api_key
                           },
                           {
                             query: {
                               method: 'GET'
                             }
                           })
        }
      };
    }]);
}());
