describe("Services : Movie Factory", function() {
  beforeEach(module("myApp"));

  describe("Movie", function() {
    var $httpBackend, $rootScope, Movie;
    var url = "https://api.themoviedb.org/3/movie/top_rated"
    /** prepare the mock data */
    var movie_data = {results: [{name: "Abc"}, {name: "Def"}]};

    beforeEach(inject(function(_Movie_, _$httpBackend_, $rootScope) {
      Movie = _Movie_;
      $httpBackend = _$httpBackend_;
      $rootScope.api = {key: "2e329c92227ed8be07944ae447c9426f"};
      $httpBackend.expectGET(url + "?api_key=" + $rootScope.api.key).respond(movie_data)
    }));

    it("should return a list of movies", function() {
      var results;

      Movie.trending(url).query(function(movies) {
        results = movies.results
      });

      $httpBackend.flush();

      expect(results.length).toEqual(2)
    });
  });
})
