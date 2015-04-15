'use strict';

(function() {
  angular.module('myApp.filters').
    filter('stars', starRating);

   function starRating() {
     var ratings = {
       1: '\u2605',
       2: '\u2605 \u2605',
       3: '\u2605 \u2605 \u2605',
       4: '\u2605 \u2605 \u2605 \u2605',
       5: '\u2605 \u2605 \u2605 \u2605 \u2605'
     };

     return function(starCount) {
       starCount = Math.round(starCount);
       return ratings[starCount];
     };
   }
}());
