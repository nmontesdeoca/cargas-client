// this plugin is required:
// cordova plugin add org.apache.cordova.network-information
var network = {

    attempt: 1,

    get: function () {
        return navigator.connection && navigator.connection.type;
    },

    isOnline: function (isOnlineCallback, isOfflineCallback) {
        var self = this;
        // in android the plugin is not ready instantly
        setTimeout(function () {
            var networkState = self.get(),
                isOnline;
            // alert(networkState);
            if (networkState === 0 && self.attempt < 4) {
                self.attempt++;
                self.isOnline(isOnlineCallback, isOfflineCallback);
            } else {
                self.attempt = 1;
                isOnline = networkState !== 0 && networkState !== 'unknown' &&
                    networkState !== 'none' && networkState !== undefined;
                if (isOnline) {
                    typeof isOnlineCallback === 'function' &&
                        isOnlineCallback();
                } else {
                    typeof isOfflineCallback === 'function' &&
                        isOfflineCallback();
                }
            }
        }, 400);
    }
},

firebaseRef,
userRef,
userObject;

// use this code when send to your devide or test in emulator
// document.addEventListener('deviceready', function () {
//
//     network.isOnline(
//     // online fn
//     function () {
//
//         var auth;
//
//         firebaseRef = new Firebase('https://cargas-app.firebaseio.com/');
//         auth = firebaseRef.getAuth();
//
//         if (auth) {
//             userRef = firebaseRef.child('users').child(auth.uid);
//             userRef.once('value', function (userSnapshot) {
//                 userObject = userSnapshot.val();
//                 // start the application after to get the user info
//                 angular.bootstrap(document.body, ['cargas']);
//             });
//         } else {
//             angular.bootstrap(document.body, ['cargas']);
//         }
//     },
//     // offline fn
//     function () {
//         angular.bootstrap(document.body, ['cargas']);
//     });
//
// }, false);


// uncomment the next code to test on browser
document.addEventListener('DOMContentLoaded', function () {

    var auth;

    firebaseRef = new Firebase('https://cargas-app.firebaseio.com/');
    auth = firebaseRef.getAuth();

    if (auth) {
        userRef = firebaseRef.child('users').child(auth.uid);
        userRef.once('value', function (userSnapshot) {
            userObject = userSnapshot.val();
            // start the application after to get the user info
            angular.bootstrap(document.body, ['cargas']);
        });
    } else {
        angular.bootstrap(document.body, ['cargas']);
    }

}, false);
