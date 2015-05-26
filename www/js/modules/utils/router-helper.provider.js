(function () {
    'use strict';

    angular
        .module('utils')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerHelperProvider($stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        this.$get = RouterHelper;

        RouterHelper.$inject = ['$state'];

        function RouterHelper() {
            var hasOtherwise = false,
                service = {
                    configureStates: configureStates
                };

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }
        }
    }

})();
