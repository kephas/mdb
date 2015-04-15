'use strict';

(function() {
  angular.module('myApp.services')
    .factory('SavedState', SavedState);

  function SavedState() {
    var state = {};

    return {
      setState: function(config) {
        Object.keys(config).map(function(k) {
          state[k] = config[k];
        });
      },
      getState: function() {
        return state;
      }
    };
  }

}());
