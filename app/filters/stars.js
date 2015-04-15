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
       starCount = Math.floor(starCount);
       starCount = starCount < 6 ? 1 : (starCount % 5 == 0 ? 5 : starCount % 5 + 1);
       return ratings[starCount];
     };
   }
}());
