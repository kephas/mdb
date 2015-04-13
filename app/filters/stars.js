'use strict';

(function() {
  angular.module('myApp.filters')
    .filter('stars', starRating);

  function starRating() {
    var ratings = {
      1: '\u2605',
      2: '\u2605 \u2605',
      3: '\u2605 \u2605 \u2605',
      4: '\u2605 \u2605 \u2605 \u2605',
      5: '\u2605 \u2605 \u2605 \u2605 \u2605'
    }

    return function(starCounts) {
      starCounts = Math.ceil(starCounts);
      starCounts = starCounts < 4 ? 1 : (starCounts % 5 == 0 ? 5 : starCounts % 5 + 1)
      return ratings[starCounts]
    }
  }
}())
