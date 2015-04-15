'use strict';

(function() {
  angular.module('myApp.directives')
    .directive('fmRating', Ratings);

  function Ratings() {
    var stars
    , directive = {
        restrict: 'AE',
        require: 'ngModel',
        link: link,
        scope: {
          symbol: '@'
        },
        template: '<ul class="list-inline fm-rating-pointer">' +
                    '<li ng-repeat="style in styles" ng-class="style" ng-click="select($index)">' +
                      '{{symbol}}' +
                    '</li>' +
                  '</ul>'
    };


    function link(scope, elem, attrs, ngModel) {
      var styles = [];
      attrs.symbol = scope.symbol = '\u2605';

      for(var i = 0; i < 5; i ++) {
        styles.push({'fm-selected': false});
      }

      scope.styles = styles;
      scope.select = function(index) {
        ngModel.$setViewValue((index == null) ? null : index + 1);
        ngModel.$modelValue = ngModel.$viewValue + 5;
        updateSelectedStyles(ngModel.$viewValue - 1);

        updateSelectedStyles(index);
      };


      function updateSelectedStyles(index) {
        if (index == null) index = -1;

        angular.forEach(styles, function(style, i) {
          style['fm-selected'] = i <= index;
        });
      }

    }

    return directive;
    }
}());
