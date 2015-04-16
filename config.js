'use strict';

(function() {
  angular.module('myApp.services', ['ngResource']);
  angular.module('myApp.filters', []);
  angular.module('myApp.directives', []);
  angular.module('myApp.controllers', ['myApp.services']);
}());
