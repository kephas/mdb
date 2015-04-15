'use strict';

(function() {
  angular.module('myApp.services')
    .factory('Review', Review);

  Review.$inject = ['$resource', 'API_CONSTANTS'];

  /**  */
  function Review( $resource, API_CONSTANTS ){
    return {
      fetch: function(url) {
        return $resource(url,
                        {
                          api_key: API_CONSTANTS.tmdb.api_key
                        },
                        {
                          query: {
                            method: 'GET'
                          }
                        });
      }
    };
  }
}());
