angular.module('CarGas.Config').factory('Utils', function (localStorageService) {
    return {
        formatDate: function (date) {
            var month = parseInt(date.getMonth(), 10) + 1;

            month = month > 9 ? month : '0' + month;

            return date.getFullYear() + '-' +
                month + '-' +
                date.getDate();
        }
    }
});
