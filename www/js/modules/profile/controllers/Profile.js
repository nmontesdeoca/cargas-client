angular.module('profile')

.controller('Profile', [
    '$scope',
    '$rootScope',
    '$state',
    '$ionicPopup',
    '$ionicLoading',
    '$firebaseAuth',
    '$firebaseObject',
    '$translate',
    'LocalStorage',
    'FirebaseRef',
    'Auth',
    'Sync',
    'profile',
    'loggedInData',
    function ($scope, $rootScope, $state, $ionicPopup, $ionicLoading, $firebaseAuth, $firebaseObject,
            $translate, LocalStorage, FirebaseRef, Auth, Sync, profile, loggedInData) {

        var userRef,
            userObject,

            authLogin = function (fromRegister) {

                Auth.$authWithPassword({
                    email: $scope.profile.loginEmail || $scope.profile.email,
                    password: $scope.profile.loginPassword || $scope.profile.password
                })
                .then(function (userData) {

                    if (fromRegister) {

                        $ionicPopup.alert({
                            title: 'Profile',
                            template: 'Successfully saved.'
                        });

                        $ionicLoading.hide();

                    } else {

                        userRef = FirebaseRef.child('users').child(userData.uid);

                        userObject = $firebaseObject(userRef);

                        userObject.$loaded().then(function() {

                            // update local storage
                            Sync.fromFirebase(userObject);

                            // maybe we can use $bindTo (we need investigate about it)
                            // the extend it's because $scope.profile must be a Profile Model instance
                            // added {} because we were overwriting the profile variable
                            _.extend($scope.profile, profile, userObject.profile);

                            $translate.use(userObject.settings.language);

                            $ionicLoading.hide();
                        })
                        .catch(function (error) {
                            console.log('Sync error:', error);
                        });
                    }
                })
                .catch(function (error) {

                    $ionicPopup.alert({
                        title: 'Login Error',
                        template: error
                    });

                    $ionicLoading.hide();
                });
            },

            updateUserInfo = function (loggedIn, fromRegister) {

                // save profile in local storage
                $scope.profile.$save(function () {

                    // do not store the password
                    delete $scope.profile.password;

                    // and then save in firebase
                    userRef.set({
                        email: $scope.profile.email,
                        firstname: $scope.profile.firstname,
                        lastname: $scope.profile.lastname,
                        cars: LocalStorage.getObject('cars'),
                        fuels: LocalStorage.getObject('fuels'),
                        profile: LocalStorage.getObject('profile'),
                        refuels: LocalStorage.getObject('refuels'),
                        settings: LocalStorage.getObject('settings')
                    },
                    function (error) {

                        if (!error) {
                            // only close the modal
                            if (loggedIn) {
                                $ionicLoading.hide();
                            } else {
                                // logged in the recently created user
                                // createUser method does not logged the user
                                authLogin(fromRegister);
                            }

                        } else {

                            $ionicPopup.alert({
                                title: 'Error',
                                template: error
                            });

                            $ionicLoading.hide();
                        }
                    });
                });
            };

        $scope.profile = profile;

        $scope.loggedIn = loggedInData;// || profile.uid;

        $scope.save = function () {

            $ionicLoading.show({
                template: $scope.loggedIn ? 'Updating info...' : 'Signing Up...'
            });

            // update info
            if ($scope.loggedIn && $scope.loggedIn.uid) {

                userRef = FirebaseRef.child('users').child($scope.loggedIn.uid);

                // if really logged in, just update the info of current customer
                updateUserInfo($scope.loggedIn);

            } else {
                // create user
                Auth.$createUser({
                    email: $scope.profile.email,
                    password: $scope.profile.password
                })
                .then(function (userData) {

                    userRef = FirebaseRef.child('users').child(userData.uid);

                    $scope.profile.uid = userData.uid;

                    updateUserInfo(false, true);
                })
                .catch(function (error) {

                    $ionicPopup.alert({
                        title: 'Error',
                        template: error
                    });

                    $ionicLoading.hide();
                });
            }
        };

        $scope.login = function () {

            $ionicLoading.show({
                template: 'Loggin in...'
            });

            authLogin();
        };

        Auth.$onAuth(function(authData) {

            if (!authData) {

                $scope.profile = {
                    loginEmail: $scope.profile.email || $scope.profile.loginEmail
                };

                Sync.fromFirebase({
                    profile: $scope.profile
                });
            }

            $scope.loggedIn = authData;
        });
    }
]);
