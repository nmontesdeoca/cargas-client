describe('left-navigation directive', function () {
    var $compile,
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('CarGas'));
    beforeEach(module('CarGas.Main'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function ($compile, $rootScope) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = $compile;
      $rootScope = $rootScope;
    }));


    it('something', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile("<nav left-navigation></nav>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();

        console.log(element);
        console.log($rootScope.tabs, 1);
        // Check that the compiled element contains the templated content
        // expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
    });
});
