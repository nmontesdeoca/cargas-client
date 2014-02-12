(function (angular) {

    var config = angular.module('CarGas.Config', []);

    angular.extend(config, {
        // herokuapp
        apiURL: 'http://cargas-server.herokuapp.com',
        // local
        // apiURL: 'http://localhost:3000',
        fuels: ['$location', 'Fuel', 'UserService', function ($location, Fuel, UserService) {
            if (!UserService.isLoggedIn) {
                return $location.path('/login');
            }
            return Fuel.query();
        }],
        refuel: ['$route', '$location', 'Refuel', 'UserService', function ($route, $location, Refuel, UserService) {
            if (!UserService.isLoggedIn) {
                return $location.path('/login');
            }
            return Refuel.get({ id: $route.current.params.id });
        }],
        refuels: ['Refuel', '$location', 'UserService', function (Refuel, $location, UserService) {
            if (!UserService.isLoggedIn) {
                return $location.path('/login');
            }
            return Refuel.query();
        }],
        user: ['User', 'UserService', function (User, UserService) {
            if (UserService.isLoggedIn) {
                return User.getCurrentUser();
            }
        }],
        getCookie: function (ckName) {
            var i,
                cookieKey,
                cookieValue,
                cookiesArray = document.cookie.split(';'),
                cookiesLength = cookiesArray.length,
                currentValue,
                indexOfEqual;
            for (i = 0; i < cookiesLength; i++) {
                currentValue = cookiesArray[i];
                indexOfEqual = currentValue.indexOf('=');
                cookieKey = currentValue.substr(0, indexOfEqual);
                cookieValue = currentValue.substr(indexOfEqual + 1);
                cookieKey = cookieKey.replace(/^\s+|\s+$/g, '');
                if (cookieKey === ckName) {
                    return unescape(cookieValue);
                }
            }
            return null;
        },
        setCookie: function (ckName, value, exDays) {
            var exDate,
                expires = '',
                ckValue;
            if (exDays && parseFloat(exDays)) {
                exDate = new Date();
                exDate.setDate(exDate.getDate() + exDays);
                expires = ';expires=' + exDate.toUTCString();
            }
            ckValue = escape(value) + expires;
            document.cookie = ckName + '=' + ckValue;
        },
        deleteCookie: function (ckName) {
            document.cookie = ckName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }
    });

    config.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }])
    .factory('httpRequestInterceptor', [
        '$q',
        '$location',
        '$cookieStore',
        function($q, $location, $cookieStore) {
            return {
                request: function($config) {
                    $config.headers['Authorization'] = 'Basic ' + config.getCookie('authdata');

                    return $config;
                }
            };
        }
    ])
    .factory('Auth', ['Base64', '$cookieStore', '$http', function (Base64, $cookieStore, $http) {
        return {
            setCredentials: function (username, password) {
                // debugger
                // var cookieExtraData = ';expires=' + (1 * 365 * 24 * 60 * 60 * 1000);// + ';path=/';
                // $cookieStore.put('authdata', Base64.encode(username + ':' + password) + cookieExtraData);
                config.setCookie('authdata', Base64.encode(username + ':' + password), 365 * 50);
            },
            clearCredentials: function () {
                document.execCommand("ClearAuthenticationCache");
                // $cookieStore.remove('authdata');
                config.deleteCookie('authdata');
            }
        };
    }])
    .factory('Base64', function() {
        var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };
    });

})(angular);

