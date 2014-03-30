angular.module('CarGas.Refuel').factory('Refuel', ['localStorageService', 'Model',
    function (localStorageService, Model) {

        return Model('refuels');
    }
]);
