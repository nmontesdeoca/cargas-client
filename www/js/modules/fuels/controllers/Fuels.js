angular.module('fuels')

.controller('Fuels', [
    '$scope',
    'fuels',
    function ($scope, fuels) {
        if (window.analytics) {
            window.analytics.trackView('Fuels');
        }

        $scope.fuels = fuels;
    }
]);
