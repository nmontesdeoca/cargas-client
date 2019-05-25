angular.module('cargas', [
    'ionic',
    'ngResource',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'stats',
    'settings',
    'utils',
    'intro',
    'templates'
])

.run([
    '$ionicPlatform',
    '$rootScope',
    '$translate',
    '$ionicSideMenuDelegate',
    'tmhDynamicLocale',
    'Setting',
    'Sync',
    'LocalStorage',
    function ($ionicPlatform, $rootScope, $translate, $ionicSideMenuDelegate,
            tmhDynamicLocale, Setting, Sync, LocalStorage) {

        $ionicPlatform.ready(function () {

            var isAndroid = ionic.Platform.isAndroid(),
                lastLocalConnection = Number(LocalStorage.get('lastConnection'), 0),
                profileForFirebase,
                settings;

            // SYNC ----------------------------
            $rootScope.FirebaseRef = firebaseRef;
            $rootScope.userRef = userRef;

            if (userObject) {

//////////// MOVE THIS TO A FUNCTION THAT CAN BE USED HERE AND FROM PROFILE CTRLER ////////////////////////
                // we need to save to firebase
                if (userObject.lastConnection < lastLocalConnection) {

                    profileForFirebase = LocalStorage.getObject('profile');

                    // do not store the password
                    delete profileForFirebase.password;
                    // delete loginEmail (don't needed in firebase)
                    delete profileForFirebase.loginEmail;

                    // and then save in firebase
                    $rootScope.userRef.set({
                        cars: LocalStorage.getObject('cars'),
                        fuels: LocalStorage.getObject('fuels'),
                        profile: profileForFirebase,
                        refuels: LocalStorage.getObject('refuels'),
                        settings: LocalStorage.getObject('settings'),
                        lastConnection: Date.now()
                    },
                    function (error) {
                        if (error) {
                            console.log('error saving data to firebase', error);
                        }
                    });

                } else {
                    // we need to save from firebase
                    Sync.fromFirebase(userObject);
                    LocalStorage.setObject('lastConnection', Date.now());
                }
            }

            // reset global variables
            firebaseRef = null;
            userRef = null;
            userObject = null;
            // END SYNC ------------------------

            if (window.analytics) {
                window.analytics.startTrackerWithId('UA-16179838-10');
                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    window.analytics.trackView(toState);
                });
            } else {
                console.log('Google Analytics Unavailable');
            }

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

            settings = Setting.query();

            if (!settings._id) {
                settings.initialize();
            } else {
                $translate.use(settings.language);
            }

            tmhDynamicLocale.set(settings.locale || 'es-uy');

            // to make underscore available at any template
            $rootScope._ = _;

            // if social sharing plugin is not available hide the share button
            $rootScope.socialSharingAvailable = !!(window.plugins &&
                window.plugins.socialsharing);

            // triggered when the phone is connected to the internet
            document.addEventListener('online', function () {

                var auth;
                var firebaseConfig = {
                    apiKey: "AIzaSyAVlRa11jqlwqJf9cFVNHw2N3Xp9n4SE4I",
                    authDomain: "cargas-app.firebaseapp.com",
                    databaseURL: "https://cargas-app.firebaseio.com"
                };

                // $rootScope.FirebaseRef = new Firebase('https://cargas-app.firebaseio.com/');
                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                $rootScope.FirebaseRef = firebase.database().ref();
                auth = firebase.auth();
                auth.onAuthStateChanged(function onAuthStateChanged(user) {
                    if (user) {
                        $rootScope.userRef = $rootScope.FirebaseRef.child('users').child(user.uid);

                        $rootScope.userRef.once('value', function (userSnapshot) {

                            var userObject = userSnapshot.val,
                                lastLocalConnection = Number(LocalStorage.get('lastConnection'), 0),
                                profileForFirebase;

                            // we need to save to firebase
                            if (userObject.lastConnection < lastLocalConnection) {

                                profileForFirebase = LocalStorage.getObject('profile');

                                // do not store the password
                                delete profileForFirebase.password;
                                // delete loginEmail (don't needed in firebase)
                                delete profileForFirebase.loginEmail;

                                // and then save in firebase
                                $rootScope.userRef.set({
                                    cars: LocalStorage.getObject('cars'),
                                    fuels: LocalStorage.getObject('fuels'),
                                    profile: profileForFirebase,
                                    refuels: LocalStorage.getObject('refuels'),
                                    settings: LocalStorage.getObject('settings'),
                                    lastConnection: Date.now()
                                },
                                function (error) {
                                    if (error) {
                                        console.log('error saving data to firebase', error);
                                    }
                                });

                            } else {
                                // we need to save from firebase
                                Sync.fromFirebase(userObject);
                                LocalStorage.setObject('lastConnection', Date.now());
                            }
                        });
                    } else {
                        // User logged out
                    }
                });
            }, false);

            // triggered when the phone loose the internet connection
            document.addEventListener('offline', function () {
                if ($rootScope.FirebaseRef) {
                    Firebase.goOffline();
                    $rootScope.FirebaseRef = null;
                    $rootScope.userRef = null;
                }
            }, false);
        });
    }
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    'tmhDynamicLocaleProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider,
        tmhDynamicLocaleProvider, $ionicConfigProvider) {

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

        tmhDynamicLocaleProvider.localeLocationPattern(
            'lib/angular-i18n/angular-locale_{{locale}}.js');

        // just for test in browser
        $ionicConfigProvider.views.transition('android');
        // do not cache views
        $ionicConfigProvider.views.maxCache(0);
        // forward cache
        $ionicConfigProvider.views.forwardCache(true);
        // prefetch all the templates until now
        $ionicConfigProvider.templates.maxPrefetch(24);

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
