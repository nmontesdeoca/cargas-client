angular.module('profile')

.controller('Profile', [
    '$scope',
    '$rootScope',
    '$ionicPopup',
    '$ionicLoading',
    '$translate',
    'LocalStorage',
    'Sync',
    'Profile',
    function ($scope, $rootScope, $ionicPopup, $ionicLoading, $translate,
            LocalStorage, Sync, Profile) {

        var authLogin = function (fromRegister) {

            $rootScope.FirebaseRef.authWithPassword({
                email: $scope.profile.email || $scope.profile.loginEmail,
                password: $scope.profile.password || $scope.profile.loginPassword
            },
            function (error, userData) {

                if (error) {

                    $ionicPopup.alert({
                        title: 'Login Error',
                        template: error
                    });

                    $ionicLoading.hide();

                } else {

                    if (fromRegister) {

                        $ionicPopup.alert({
                            title: 'Profile',
                            template: 'Successfully saved.'
                        });

                        $ionicLoading.hide();

                    } else {

                        $rootScope.userRef = $rootScope.FirebaseRef.child('users').child(userData.uid);

                        $rootScope.userRef.once('value', function (userSnapshot) {

                            userObject = userSnapshot.val();
                            // update local storage
                            Sync.fromFirebase(userObject);

                            // update scope profile
                            $scope.profile = Profile.query();

                            $translate.use(userObject.settings.language);

                            $ionicLoading.hide();

                        }, function (error) {
                            console.log('Sync error:', error);
                        });
                    }
                }
            });
        },

        updateUserInfo = function (loggedIn, fromRegister) {

            // ensure that the profile is a Model
            if (!($scope.profile instanceof Profile)) {
                $scope.profile = new Profile($scope.profile);
            }

            // save profile in local storage
            $scope.profile.$save(function () {

                var profileForFirebase = LocalStorage.getObject('profile');

                // do not store the password
                delete profileForFirebase.password;
                // delete loginEmail (don't needed in firebase)
                delete profileForFirebase.loginEmail;

                // and then save in firebase
                $rootScope.userRef.set({
                    // email: $scope.profile.email,
                    // firstname: $scope.profile.firstname,
                    // lastname: $scope.profile.lastname,
                    cars: LocalStorage.getObject('cars'),
                    fuels: LocalStorage.getObject('fuels'),
                    profile: profileForFirebase,
                    refuels: LocalStorage.getObject('refuels'),
                    settings: LocalStorage.getObject('settings'),
                    lastConnection: Date.now()
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

        $scope.profile = Profile.query();

        $scope.loggedIn = $rootScope.FirebaseRef.getAuth(); // || profile.uid;

        $scope.save = function () {

            $ionicLoading.show({
                template: $scope.loggedIn ? 'Updating info...' : 'Signing Up...'
            });

            // update info
            if ($scope.loggedIn && $scope.loggedIn.uid) {

                $rootScope.userRef = $rootScope.FirebaseRef.child('users').child($scope.loggedIn.uid);

                // if really logged in, just update the info of current customer
                updateUserInfo($scope.loggedIn);

            } else {
                // create user
                $rootScope.FirebaseRef.createUser({
                    email: $scope.profile.email,
                    password: $scope.profile.password
                },

                function (error, userData) {

                    if (error) {

                        $ionicPopup.alert({
                            title: 'Error',
                            template: error
                        });

                        $ionicLoading.hide();

                    } else {

                        $rootScope.userRef = $rootScope.FirebaseRef.child('users')
                            .child(userData.uid);

                        $scope.profile.uid = userData.uid;

                        updateUserInfo(false, true);
                    }
                });
            }
        };

        $scope.login = function () {

            $ionicLoading.show({
                template: 'Loggin in...'
            });

            authLogin();
        };

        $scope.logout = function () {
            $rootScope.FirebaseRef.unauth();
        };

        $rootScope.FirebaseRef.onAuth(function(authData) {

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
