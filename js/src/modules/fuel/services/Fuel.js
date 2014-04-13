angular.module('CarGas.Fuel').factory('Fuel', ['localStorageService', 'Model',
    function (localStorageService, Model) {

        return Model('fuels');
    }
]);
