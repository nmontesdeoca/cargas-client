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

.factory('Utils', function () {
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
                    make: 'Asia',
                    models: [
                        'Topic',
                        'Towner',
                        'Other'
                    ]
                },
                {
                    make: 'Audi',
                    models: [
                        'A1',
                        'A3',
                        'A4',
                        'A5',
                        'A6',
                        'Q5',
                        'Q7',
                        'Other'
                    ]
                },
                {
                    make: 'BMW',
                    models: [
                        '2002',
                        'Serie 1',
                        'Serie 3',
                        'Serie 5',
                        'Serie 6',
                        'Serie 7',
                        'Serie M',
                        'X1',
                        'X3',
                        'X5',
                        'Z4',
                        'Other'
                    ]
                },
                {
                    make: 'Chevrolet',
                    models: [
                        'Agile',
                        'Astra',
                        'Aveo',
                        'Blazer',
                        'C-10',
                        'Camaro',
                        'Captiva',
                        'Celta',
                        'Chevette',
                        'Cobalt',
                        'Corsa',
                        'Corsa Combo',
                        'Corsa Pick-Up',
                        'Cruze',
                        'D-20',
                        'D-Max',
                        'Ipanema',
                        'Kadett',
                        'Mega',
                        'Meriva',
                        'Montana',
                        'Monza',
                        'Onix',
                        'S10',
                        'Sail',
                        'Silverado',
                        'Spark',
                        'Tracker',
                        'Vectra',
                        'Vectra GT',
                        'Zafira',
                        'Other'
                    ]
                },
                {
                    make: 'Chrysler',
                    models: [
                        '300 C',
                        'Stratus',
                        'Other'
                    ]
                },
                {
                    make: 'Citroën',
                    models: [
                        'AX',
                        'Berlingo',
                        'BX',
                        'C-Elysée',
                        'C15',
                        'C3',
                        'C4',
                        'C5',
                        'Jumper',
                        'Méhari',
                        'Olcit',
                        'Saxo',
                        'Visa',
                        'Xantia',
                        'Xsara',
                        'Xsara Picasso',
                        'ZX',
                        'Other'
                    ]
                },
                {
                    make: 'Daewoo',
                    models: [
                        'Cielo',
                        'Damas',
                        'Espero',
                        'Lanos',
                        'Matiz',
                        'Racer',
                        'Tico',
                        'Other'
                    ]
                },
                {
                    make: 'Daihatsu',
                    models: [
                        'Applause',
                        'Charade',
                        'Cuore',
                        'Hijet',
                        'Sirion',
                        'Terios'
                    ]
                },
                {
                    make: 'Dodge',
                    models: [
                        'Caravan',
                        'Journey',
                        'Ram',
                        'Other'
                    ]
                },
                {
                    make: 'Fiat',
                    models: [
                        '128',
                        '147',
                        '600',
                        'Bravo',
                        'Cinquecento',
                        'Ducato',
                        'Duna',
                        'Elba',
                        'Fiorino',
                        'Fiorino Pick-Up',
                        'Idea',
                        'Oggi',
                        'Palio',
                        'Panda',
                        'Panorama',
                        'Premio',
                        'Punto',
                        'Siena',
                        'Spazio',
                        'Strada',
                        'Strada Adventure',
                        'Tempra',
                        'Tipo',
                        'Uno',
                        'Other'
                    ]
                },
                {
                    make: 'Ford',
                    models: [
                        'Courier',
                        'Del Rey',
                        'EcoSport',
                        'Escort',
                        'Explorer',
                        'F-100',
                        'F-150',
                        'F-250',
                        'F1000',
                        'Falcon',
                        'Festiva',
                        'Fiesta',
                        'Fiesta Max',
                        'Focus',
                        'Ka',
                        'Pick-Up',
                        'Ranger',
                        'Taunus',
                        'Verona',
                        'Other'
                    ]
                },
                {
                    make: 'Honda',
                    models: [
                        'Accord',
                        'Civic',
                        'CR-V',
                        'Fit',
                        'Odyssey',
                        'Prelude',
                        'Other'
                    ]
                },
                {
                    make: 'Hyundai',
                    models: [
                        'Accent',
                        'Atos',
                        'Elantra',
                        'Excel',
                        'Galloper',
                        'H1',
                        'H100',
                        'i10',
                        'i30',
                        'Porter',
                        'Santa Fe',
                        'Scoupe',
                        'Sonata',
                        'Tucson',
                        'Other'
                    ]
                },
                {
                    make: 'Isuzu',
                    models: [
                        'Pick-Up',
                        'Other'
                    ]
                },
                {
                    make: 'Jeep',
                    models: [
                        'Cherokee',
                        'Cherokee Sport',
                        'CJ',
                        'Compass',
                        'Grand Cherokee',
                        'Willys',
                        'Wrangler',
                        'Other'
                    ]
                },
                {
                    make: 'Kia',
                    models: [
                        'Avella',
                        'Besta',
                        'Carnival',
                        'Cerato',
                        'K 2700',
                        'Picanto',
                        'Pregio',
                        'Pride',
                        'Rio',
                        'Sportage',
                        'Other'
                    ]
                },
                {
                    make: 'Land Rover',
                    models: [
                        'Discovery',
                        'Freelander',
                        'Other'
                    ]
                },
                {
                    make: 'MG',
                    models: [
                        'Other'
                    ]
                },
                {
                    make: 'Mazda',
                    models: [
                        '323',
                        'B2500',
                        'BT-50',
                        'Other'
                    ]
                },
                {
                    make: 'Mercedes Benz',
                    models: [
                        'Clase A',
                        'Clase B',
                        'Clase C',
                        'Clase CLC',
                        'Clase CLK',
                        'Clase E',
                        'Clase GLK',
                        'Clase S',
                        'Clase SL',
                        'Clase SLK',
                        'MB',
                        'ML',
                        'Sprinter',
                        'Other'
                    ]
                },
                {
                    make: 'Mini',
                    models: [
                        'Cooper',
                        'Cooper S'
                    ]
                },
                {
                    make: 'Mitsubishi',
                    models: [
                        'Colt',
                        'Eclipse',
                        'Galant',
                        'L200',
                        'L300',
                        'Lancer',
                        'Montero',
                        'Nativa',
                        'Outlander',
                        'Space Wagon',
                        'Sportero',
                        'Other'
                    ]
                },
                {
                    make: 'Nissan',
                    models: [
                        '720',
                        'D21',
                        'D22',
                        'Datsun',
                        'Frontier',
                        'Maxima',
                        'Murano',
                        'NX',
                        'Pathfinder',
                        'Pick-Up',
                        'Sentra',
                        'Sunny',
                        'Terrano',
                        'Tiida',
                        'Trade',
                        'Vanette',
                        'Versa',
                        'X-Trail',
                        'Other'
                    ]
                },
                {
                    make: 'Peugeot',
                    models: [
                        '106',
                        '107',
                        '205',
                        '206',
                        '207',
                        '208',
                        '3008',
                        '301',
                        '306',
                        '307',
                        '308',
                        '309',
                        '404',
                        '404 Pick-Up',
                        '405',
                        '406',
                        '407',
                        '408',
                        '5008',
                        '504',
                        '504 Pick-Up',
                        '505',
                        '605',
                        'Boxer',
                        'Expert',
                        'Partner',
                        'Other'
                    ]
                },
                {
                    make: 'Porsche',
                    models: [
                        '911',
                        'Other'
                    ]
                },
                {
                    make: 'Renault',
                    models: [
                        'Clio',
                        'Express',
                        'Kangoo',
                        'Kangoo Express',
                        'Laguna',
                        'Master',
                        'Mégane',
                        'Mégane II',
                        'R11',
                        'R12',
                        'R18',
                        'R19',
                        'R9',
                        'Scénic',
                        'Symbol',
                        'Trafic',
                        'Twingo',
                        'Other'
                    ]
                },
                {
                    make: 'Rover',
                    models: [
                        '214',
                        '416',
                        '620',
                        'Maestro',
                        'Other'
                    ]
                },
                {
                    make: 'Seat',
                    models: [
                        'Cordoba',
                        'Toledo',
                        'Other'
                    ]
                },
                {
                    make: 'Subaru',
                    models: [
                        'Forester',
                        'Impreza',
                        'Legacy',
                        'Outback',
                        'Van',
                        'Vivio',
                        'Other'
                    ]
                },
                {
                    make: 'Suzuki',
                    models: [
                        'Alto',
                        'Baleno',
                        'Carry',
                        'Celerio',
                        'Forza',
                        'Grand Vitara',
                        'Maruti',
                        'Samurai',
                        'Swift',
                        'SX4',
                        'Vitara',
                        'Other'
                    ]
                },
                {
                    make: 'Toyota',
                    models: [
                        '4Runner',
                        'Bandeirante',
                        'Camry',
                        'Carina',
                        'Celica',
                        'Corolla',
                        'Corona',
                        'Hilux',
                        'Hilux SW4',
                        'Land Cruiser',
                        'RAV4',
                        'Starlet',
                        'Tercel',
                        'Yaris',
                        'Other'
                    ]
                },
                {
                    make: 'Volkswagen',
                    models: [
                        '1500',
                        'Amazon',
                        'Bora',
                        'Brasilia',
                        'Caddy',
                        'Crossfox',
                        'Fox',
                        'Fusca',
                        'GLI',
                        'Gol',
                        'Golf',
                        'Kombi',
                        'Logus',
                        'Parati',
                        'Passat',
                        'Polo',
                        'Quantum',
                        'Santana',
                        'Saveiro',
                        'Senda',
                        'Suran',
                        'Tiguan',
                        'Vento',
                        'Other'
                    ]
                },
                {
                    make: 'Volvo',
                    models: [
                        '460',
                        'S40',
                        'S60',
                        'Other'
                    ]
                },
                {
                    make: 'Other',
                    models: [
                        'Other'
                    ]
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
        },

        millisecondsToSeconds: function (milliseconds) {
            return milliseconds / 1000;
        },

        millisecondsToMinutes: function (milliseconds) {
            return this.millisecondsToSeconds(milliseconds) / 60;
        },

        millisecondsToHours: function (milliseconds) {
            return this.millisecondsToMinutes(milliseconds) / 60;
        },

        millisecondsToDays: function (milliseconds) {
            return this.millisecondsToHours(milliseconds) / 24;
        },

        millisecondsToMonths: function (milliseconds) {
            // we use 30 days here, but maybe we need to investigate which is the best way
            return this.millisecondsToDays(milliseconds) / 30;
        },

        millisecondsToYears: function (milliseconds) {
            return this.millisecondsToMonths(milliseconds) / 12;
        },

        replaceFuel: function (fuels, id) {
            this.fuel = (this.fuel || id) ? _.findWhere(fuels, {
                _id: (id || this.fuel._id)
            }) : '';
        },

        unsetDefaultCar: function (Car, newCar) {
            var currentDefaultCar = Car.get({
                byDefault: true
            });
            if (newCar.byDefault && currentDefaultCar._id && newCar._id !== currentDefaultCar._id) {
                currentDefaultCar.byDefault = false;
                currentDefaultCar.$save();
            }
        },

        turnOnDefaultCar: function (Car, newCar) {
            if (!Car.query().length) {
                newCar.byDefault = true;
            }
        }
    };
})

.factory('LocalStorage', ['$window', function ($window) {
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

.factory('Model', ['LocalStorage', function (LocalStorage) {
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
            var data = LocalStorage.getObject(storageKey);

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

            LocalStorage.setObject(storageKey, models);
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

            LocalStorage.setObject(storageKey, models);
            callback && callback.apply(this, [this]);
        };

        return Model;

    };
}])

.factory('Camera', ['$q', function ($q) {
    var camera = navigator.camera || {
        PictureSourceType: {}
    };

    return {
        isAvailable: camera.getPicture,

        PictureSourceType: camera.PictureSourceType,

        getPicture: function (options) {
            var q = $q.defer();
            if (!this.isAvailable) {
                q.reject('No Camera found');
            } else {
                options = angular.extend({
                    destinationType: camera.DestinationType.FILE_URI
                }, options);

                camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);
            }

            return q.promise;
        }
    };
}]);