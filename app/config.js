'use strict';

(function() {
  angular.module('myApp.Services', ['ngResource']);
  angular.module('myApp.Controllers', ['myApp.Services']);
}());
