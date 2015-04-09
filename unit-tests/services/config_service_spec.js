describe("Services : Config Factory", function() {
  beforeEach(module("myApp"));

  describe("Config", function() {
    var $httpBackend
    , results
    , url = "https://api.themoviedb.org/3/configuration?api_key=2e329c92227ed8be07944ae447c9426f"
    , config_data = { images: { base_url: "http://tmdb.com/t/p", backdrop_sizes: ["w300", "w500"]}}
    ;

    beforeEach(inject(function(Config, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(url).respond(config_data);

      Config.get({api_key: "2e329c92227ed8be07944ae447c9426f"}, function(data) {
        results = data.images;
      });

    }));

    it("should return the base url", function() {
      $httpBackend.flush();

      expect(results.base_url).not.toBeUndefined();
    });

    it("should return the backdrop sizes", function() {
      $httpBackend.flush();
      expect(results.backdrop_sizes.length).toBeGreaterThan(0);
    });

    it("should have a backdrop size of 300", function() {
      $httpBackend.flush();
      expect(results.backdrop_sizes).toContain("w300");
    });
  });
});
