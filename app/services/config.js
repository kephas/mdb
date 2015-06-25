'use strict';

(function() {
  angular.module('myAppServicesConfig', [])
    .factory('Config', ['$resource', function($resource) {
      return $resource("http://api.themoviedb.org/3/configuration",
                      {},
                      { query: {
                        method: 'GET'
                      }
                      });
    }])
}());
