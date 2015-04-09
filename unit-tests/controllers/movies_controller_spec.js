describe('Controllers', function() {
  /** initiate the module.
      it in turn calls the myAppServices and myAppControllers required for testing the controller */

  beforeEach(module('myApp'));

  describe("MoviesCtrl", function() {
    var scope, httpBackend;
    /** prepare the mock data */
    var config_data = { images: { base_url: "http://tmdb.com/t/p", backdrop_sizes: ["w300", "w500"]}},
        movie_data = {results: [{name: "Abc"}, {name: "Def"}]};

    beforeEach(inject(function($httpBackend, $rootScope, $controller) {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();

      /** mock the http request for the configuration data */

      httpBackend.
        expectGET("https://api.themoviedb.org/3/configuration?api_key=2e329c92227ed8be07944ae447c9426f").
        respond(config_data);

      /** mock the http request to get the list of movies */

      httpBackend.
        expectGET("https://api.themoviedb.org/3/movie/top_rated?api_key=2e329c92227ed8be07944ae447c9426f").
        respond(movie_data);

      /** inject the controller */
      $controller('MoviesCtrl', { $scope: scope });
    }));

    it("should return the image object with url and backdrop size", function() {
      httpBackend.flush();
      expect(scope.image.backdrop_size).toEqual("w300");
    });


    it("should return a list of movies", function() {
      httpBackend.flush();
      expect(scope.movies.length).toEqual(2);
    });
  });

});
