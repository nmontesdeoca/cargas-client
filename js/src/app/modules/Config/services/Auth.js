angular.module('CarGas.Config').factory('Auth', ['Base64', 'CookieManager',
    function (Base64, CookieManager) {
        return {
            getAccessToken: function () {
                return CookieManager.getCookie('accessToken');
            },
            setAccessToken: function (accessToken, expires) {
                CookieManager.setCookie('accessToken', accessToken, expires);
            },
            getRefreshToken: function () {
                return CookieManager.getCookie('refreshToken');
            },
            setRefreshToken: function (refreshToken, expires) {
                CookieManager.setCookie('refreshToken', refreshToken, expires || 100);
            },
            clearCredentials: function () {
                document.execCommand("ClearAuthenticationCache");
                CookieManager.deleteCookie('accessToken');
                CookieManager.deleteCookie('refreshToken');
            }
        };
    }
]);