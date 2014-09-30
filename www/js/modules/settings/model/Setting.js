angular.module('settings')

.factory('Setting', ['Model',
    function (Model) {

        return Model('settings');
    }
]);
