angular.module('starter', [
    'ionic',
    'ngResource',
    'pascalprecht.translate',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'stats',
    'settings',
    'utils',
    'intro'
])

.run(['$ionicPlatform', '$rootScope', '$translate', '$ionicSideMenuDelegate', 'Setting',
    function ($ionicPlatform, $rootScope, $translate, $ionicSideMenuDelegate, Setting) {

        $ionicPlatform.ready(function () {

            var isAndroid = /android/i.test(navigator.userAgent),
                settings = Setting.query();

            if (!isAndroid && window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }

            if (!isAndroid && window.ionic) {
                ionic.Platform && ionic.Platform.fullScreen && ionic.Platform.fullScreen();
            }

            if (isAndroid) {
                $ionicPlatform.on('menubutton', function () {
                    $ionicSideMenuDelegate.toggleLeft();
                });
            }

            if (!settings._id) {
                settings.initialize();
            } else {
                $translate.use(settings.language);
            }

            // to make underscore available at any template
            $rootScope._ = _;

            // if the social sharing plugin is not available the share button is hiding
            $rootScope.socialSharingAvailable = !!(window.plugins && window.plugins.socialsharing);
        });
    }
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'menuController'
        });

        $urlRouterProvider.otherwise('/overview');

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }
])

.controller('menuController', ['$scope', '$filter', function ($scope, $filter) {

    $scope.share = function () {
        window.plugins.socialsharing.share(
            $filter('translate')('SHARE_MESSAGE'),
            null,
            null,
            'http://www.cargasapp.com/'
        );
    };

}]);
