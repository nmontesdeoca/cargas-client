angular.module('CarGas.Config').factory('Model', ['localStorageService', 'Utils',
    function (localStorageService, Utils) {

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
                var data = localStorageService.get(storageKey);

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

                localStorageService.set(storageKey, models);
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

                localStorageService.set(storageKey, models);
                callback && callback.apply(this, [this]);
            };

            return Model;

        };
    }
]);
