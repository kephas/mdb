describe('MoviesCtrl', function() {
  var $rootScope
  , $controller
  , services
  ;

  beforeEach( function() {
    module('myApp');
  });

  beforeEach(function() {
    module('myAppServices');
    inject(function($injector) {
      services    = $injector.get('myAppServices')
      $rootScope  = $injector.get('$rootScope');
      $controller = $injector.get('$controller')
    });
  });

  describe("Intialization", function() {
    it("should initialize the api url", function() {
      var $scope = $rootScope.new();
      var controller = $controller('MoviesCtrl', { $rootScope: $rootScope, $scope: $scope, myAppServices: services });
      expect($rootScope.api.url).toEqual("https://api.themoviedb.org/3/")
    });
  });
});
