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
          symbol: '@',
          readonly: '@'
        },
        template: '<ul class="list-inline fm-rating-pointer">' +
                    '<li ng-repeat="style in styles" ng-class="style" ng-click="select($index)">' +
                      '{{symbol}}' +
                    '</li>' +
                    '<li><a ng-click="select(null)">clear</a></li>'+
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
        // the difference between the viewValue and modelValue
        // crudely is, the former is the string and the later is value for the model
        // http://stackoverflow.com/a/19384557/1503615
        // http://stackoverflow.com/questions/19383812#comment45585259_19385139
        ngModel.$setViewValue((index == null) ? undefined : index + 1);
        // ngModel.$modelValue = (+index) + 1;
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
