angular.module('refuels')

.factory('Refuel', ['model', 'utils', function (model, utils) {

    var RefuelModel = model('refuels');

    /**
     * replace the current fuel object with the correct one from the list
     * if the second parameter "id" is present, the correct fuel will be that
     */
    RefuelModel.prototype.replaceFuel = function () {
        return utils.replaceFuel.apply(this, arguments);
    };

    return RefuelModel;
}]);
