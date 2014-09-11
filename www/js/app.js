angular.module('starter', [
    'ionic',
    'profile',
    'cars',
    'refuels',
    'utils'
])

.run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: "templates/menu.html"
        });

        $urlRouterProvider.otherwise('/profile');

    // .state('app.single', {
    //   url: "/playlists/:playlistId",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/playlist.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
}]);

angular.module('utils', [])

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
                    }
                } else {
                    data = _.filter(data, function (model) {
                        return !model.inactive;
                    });
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
}])

.directive('uploadImage', function () {
    return function (scope, element, attrs) {

        element.on('change', function (e) {
            angular.forEach(this.files, function (file, index) {
                var reader;

                if (file.type.match('image.*')) {
                    reader = new FileReader();

                    reader.onload = function (e) {
                        scope.car.set({ image: e.target.result });
                        scope.$apply();
                    };

                    reader.readAsDataURL(file);
                }

            });
        });

    };
});
