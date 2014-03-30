angular.module('CarGas.Config').factory('Auth', ['Base64',
    function (Base64) {
        return {
            getAccessToken: function () {
                // return CookieManager.getCookie('accessToken');
                return window.localStorage.accessToken;
            },
            setAccessToken: function (accessToken, expires) {
                // CookieManager.setCookie('accessToken', accessToken, expires);
                window.localStorage.accessToken = accessToken;
            },
            getRefreshToken: function () {
                // return CookieManager.getCookie('refreshToken');
                return window.localStorage.refreshToken;
            },
            setRefreshToken: function (refreshToken, expires) {
                // CookieManager.setCookie('refreshToken', refreshToken, expires || 100);
                window.localStorage.refreshToken = refreshToken;
            },
            clearCredentials: function () {
                // document.execCommand("ClearAuthenticationCache");
                // CookieManager.deleteCookie('accessToken');
                // CookieManager.deleteCookie('refreshToken');
                delete window.localStorage.accessToken;
                delete window.localStorage.refreshToken;
            }
        };
    }
]);