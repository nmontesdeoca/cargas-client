angular.module('starter', [
    'ionic',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'settings',
    'utils'
])

.run(['$ionicPlatform', '$rootScope', function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // to make underscore available at any template
        $rootScope._ = _;
    });
}])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'Menu'
        });

        $urlRouterProvider.otherwise('/overview');
    }
]);

angular.module('utils', [])

.filter('distance', function () {
    return function (value) {
        return value += ' kms';
    };
})

.filter('capacity', function () {
    return function (value) {
        return value += ' lts';
    };
})

.factory('utils', function () {
    return {

        formatDateForInput: function (date) {
            var month = parseInt(date.getMonth(), 10) + 1;

            month = month > 9 ? month : '0' + month;

            return date.getFullYear() + '-' +
                month + '-' +
                date.getDate();
        },

        formatDateToTime: function (formattedDate) {
            var splittedDate = formattedDate.split('-'),
                year = parseInt(splittedDate[0], 10),
                month = parseInt(splittedDate[1], 10) - 1,
                day = parseInt(splittedDate[2], 10),
                date = new Date();
            date.setYear(year);
            date.setMonth(month);
            date.setDate(day);
            date.setHours(0);
            return date.getTime();
        },

        getMakes: function () {
            return _.sortBy([
                {
                    make: 'Fiat',
                    models: [
                        'Uno',
                        'Palio',
                        'Siena'
                    ].sort()
                },
                {
                    make: 'Renault',
                    models: [
                        'Clio',
                        'Sandero',
                        'Megane'
                    ].sort()
                },
                {
                    make: 'Peugeot',
                    models: [
                        '208',
                        '307',
                        '308',
                        '205',
                        '405',
                        '207'
                    ].sort()
                },
                {
                    make: 'Other',
                    models: [
                        'Other'
                    ].sort()
                }
            ], 'make');
        },

        getYears: function () {
            var years = [],
                actualYear = new Date().getFullYear(),
                firstYear = 1935;

            for (; actualYear >= firstYear; actualYear--) {
                years.push(actualYear);
            }

            return years;
        }
    };
})

.factory('localstorage', ['$window', function ($window) {
    var prefix = '';
    return {
        set: function (key, value) {
            $window.localStorage[prefix + key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[prefix + key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[prefix + key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[prefix + key] || '{}');
        }
    };
}])

.factory('model', ['localstorage', function ($localStorage) {
    return function (storageKey, singleModel) {

        var setProperties = function (value, key) {
                this[key] = value;
            },

            Model = function (properties) {
                angular.forEach(properties, angular.bind(this, setProperties));
            };

        Model.get = function (idObject, object) {
            var model = singleModel ?
                Model.query() :
                _.findWhere(Model.query(), idObject);

            return object ? model : new Model(model);
        };

        Model.query = function () {
            var data = $localStorage.getObject(storageKey);

            if (data) {
                if (singleModel) {
                    if (data.inactive) {
                        data = null;
                    } else {
                        data = new Model(data);
                    }
                } else {
                    data = _.chain(data).filter(function (model) {
                        return !model.inactive;
                    }).map(function (model) {
                        return new Model(model);
                    }).value();
                }
            }

            return data || (singleModel ? {} : []);
        };

        Model.prototype.set = function (properties) {
            _.extend(this, properties);
            return this;
        };

        Model.prototype.get = function (property) {
            return this[property];
        };

        Model.prototype.$save = function (callback) {
            var models = Model.query();

            this.updatedAt = Date.now();

            if (this._id) {
                _.extend(
                    (singleModel ? models : _.findWhere(models, { _id: this._id })),
                    this
                );
            } else {
                /**
                 * _id is the updatedAt, because we can use it as identifier and also contains
                 * the date and time of createdAt
                 */
                this._id = this.updatedAt;

                if (singleModel) {
                    models = this;
                } else {
                    models.push(this);
                }
            }

            $localStorage.setObject(storageKey, models);
            callback && callback.apply(this, [this]);
        };

        Model.prototype.$remove = function (callback) {
            var models = Model.query();

            if (this._id) {
                if (singleModel) {
                    models.inactive = true;
                    // models = {};
                } else {
                    _.findWhere(models, { _id: this._id }).inactive = true;
                    // models = _.without(models, _.findWhere(models, { _id: this._id }));
                }
            }

            $localStorage.setObject(storageKey, models);
            callback && callback.apply(this, [this]);
        };

        return Model;

    };
}]);
