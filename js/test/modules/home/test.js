describe('Home controller', function () {

    beforeEach(module('CarGas'));
    beforeEach(module('CarGas.Config'));
    beforeEach(module('CarGas.Main'));
    beforeEach(module('CarGas.Home'));

    var scope, scope2;

    beforeEach(inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        scope2 = $rootScope.$new();

        $controller('Main', { $rootScope: $rootScope, $scope: scope2 });

        //declare the controller and inject our empty scope
        $controller('Home', { $rootScope: $rootScope, $scope: scope, user: {} });
    }));

     // tests start here
    it('should else stuff', function () {
        expect(scope).toBeDefined();
    });

    it('should have "Inicio" as title of parent scope', function () {
        expect(scope.$parent.title).toBe("Inicio");
    });

    it('should have "Home" as menuSelected of parent scope', function () {
        expect(scope.$parent.menuSelected).toBe("Home");
    });

});
