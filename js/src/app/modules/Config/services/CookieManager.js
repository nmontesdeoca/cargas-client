angular.module('CarGas.Config').factory('CookieManager', function () {
    return {
        getCookie: function (cookieName) {
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
                if (cookieKey === cookieName) {
                    return unescape(cookieValue);
                }
            }
            return null;
        },
        setCookie: function (cookieName, value, exDays) {
            var exDate,
                expires = '',
                ckValue;
            if (exDays && parseFloat(exDays)) {
                exDate = new Date();
                exDate.setDate(exDate.getDate() + exDays);
                expires = ';expires=' + exDate.toUTCString();
            }
            ckValue = escape(value) + expires;
            document.cookie = cookieName + '=' + ckValue;
        },
        deleteCookie: function (cookieName) {
            document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }
    };
});