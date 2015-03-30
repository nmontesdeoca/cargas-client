angular.module('overview', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

        .state('app.overview', {
            url: '/overview',
            resolve: {
                // refuels: ['Refuel', function (Refuel) {
                //     return Refuel.getRefuelsSortByDate();
                // }],
                // cars: ['Car', function (Car) {
                //     return Car.query();
                // }],
                data: [
                    '$rootScope',
                    'Refuel',
                    'Car',
                    'Auth',
                    'FirebaseRef',
                    '$firebaseObject',
                    'Sync',
                    '$translate',
                    '$q',
                    function ($rootScope, Refuel, Car, Auth, FirebaseRef,
                            $firebaseObject, Sync, $translate, $q) {

                        var q = $q.defer(),
                            authData = Auth.$getAuth(),
                            userRef,
                            userObject;

                        // if no data retrieved from firebase yet and
                        // if the user is logged in firebase
                        if (!$rootScope.syncOnLoad && authData) {

                            userRef = FirebaseRef.child('users').child(authData.uid);

                            userObject = $firebaseObject(userRef);

                            userObject.$loaded().then(function() {

                                // update local storage
                                Sync.fromFirebase(userObject);

                                $translate.use(userObject.settings.language);

                                $rootScope.syncOnLoad = true;

                                console.log('sync on load!');

                                q.resolve({
                                    refuels: Refuel.getRefuelsSortByDate(),
                                    cars: Car.query()
                                });
                            })
                            .catch(function (error) {
                                console.log('Sync error:', error);
                                q.resolve({
                                    refuels: Refuel.getRefuelsSortByDate(),
                                    cars: Car.query()
                                });
                            });

                        } else {
                            q.resolve({
                                refuels: Refuel.getRefuelsSortByDate(),
                                cars: Car.query()
                            });
                        }

                        return q.promise;
                }]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/overview/overview.html',
                    controller: 'Overview'
                },
                'withData@app.overview': {
                    templateUrl: 'templates/overview/overview-with-data.html'
                },
                'noData@app.overview': {
                    templateUrl: 'templates/overview/overview-no-data.html'
                }
            }
        });
}]);
