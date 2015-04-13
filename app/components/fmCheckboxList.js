'use strict';

(function() {
  angular.module('myApp.directives')
    .directive('fmCheckboxList', MovieGenres);

  function MovieGenres() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };

    function link(scope, elem, attrs, ngModel) {
      // get teh selected values and change the ng-model values
      // trigger the digest cycle
      elem.on('click', function(e) {
        if(angular.lowercase(e.target.nodeName) == 'input') {
          scope.$apply(function() {
            var values = [];
            angular.forEach(elem.find('input'), function(input) {
              if(input.checked) {
                values.push(input.getAttribute('value'));
              }
            });

            ngModel.$setViewValue(values);
          });
        }
      });
    }

    return directive;
  }
}());
