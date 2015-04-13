'use strict';

(function() {
  angular.module('myApp.services').
    factory('Genre', Genre);

  Genre.$inject = ['$resource', '$rootScope'];


  function Genre($resource, $rootScope) {
    return {
      all: function(domain, url) {
        return $resource(url,
                         {
                           api_key: API_CONSTANTS.tmdb.api_key
                         },
                         {
                           query: {
                             method: 'GET'
                           }
                         }
                        )},

      find: function(domain, url, params) {
        params = params || {}
        params["api_key"] = API_CONSTANTS.tmdb.api_key
        return $resource(url,
                         params,
                         {
                           query: {
                             method: 'GET'
                           }
                         });
      }
    }
  }
}());
