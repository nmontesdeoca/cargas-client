angular.module('utils', [])

.constant('TIME', {
    MILLISECONDS: 1,
    SECONDS: 2,
    MINUTES: 3,
    HOURS: 4,
    DAYS: 5,
    WEEKS: 6, // maybe we don't use this
    MONTHS: 7,
    YEARS: 8
})

.directive('randomBackground', ['Flickr', 'Utils',
    function (Flickr, Utils) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {

                Utils.network.isOnline(function () {

                    var time = Utils.isNight() ? 'night' : 'day';

                    Flickr.search({
                        tags: 'highway,' + time,
                        tag_mode: 'all',
                        text: 'highway road street ' + time,
                        // TODO before set 500 pages we need to know if there are 500 results ?
                        page: Math.round(Math.random() * 500),
                        per_page: 1,
                        media: 'photos',
                        privacy_filter: 1,
                        content_type: 4
                    }).then(function (data) {
                        var image = new Image(),
                            photos = data && data.photos && data.photos.photo,
                            item,
                            url;

                        if (photos && photos.length) {
                            item = photos[0];
                            url = 'http://farm' + item.farm + '.static.flickr.com/' +
                                item.server + '/' +
                                item.id + '_' + item.secret + '.jpg';

                            /**
                             * create an image with the image src on the fly in order
                             * to get the url fetched, so when we place the background
                             * the image loads instantly
                             */
                            image.src = url;
                            image.onload = function () {
                                $element.css('background-image', 'url(' + url + ')');
                                Utils.hideSplahscreen();
                            };
                        } else {
                            Utils.hideSplahscreen();
                        }
                    });
                },
                function () {
                    Utils.hideSplahscreen();
                });
            }
        };
    }
])

.directive('fixTransparentIonItem', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {

            $element.on('drag', function () {
                $element.find('a').css('background-color', 'white');
            });

            $element.on('release', function () {
                $element.find('a').css('background-color', 'transparent');
            });
        }
    };
})

.filter('distance', function () {
    return function (value) {
        return value += ' kms';
    };
})

.filter('consumption', function () {
    return function (value) {
        return value += ' kms/l';
    };
})

.filter('capacity', function () {
    return function (value) {
        return value += ' lts';
    };
})

.filter('timeAgo', ['$filter', 'Utils', function ($filter, Utils) {
    return function (value) {
        var unit = $filter('translate')('DAYS'),
            agoText,
            valueDate = new Date(value),
            today = new Date(),
            yesterday = new Date(),
            timeAgo = Utils.calculateDays(today, value);
        
        yesterday.setDate(today.getDate() - 1);

        if (valueDate.toDateString() == today.toDateString()) {
            agoText = $filter('translate')('TODAY'); 
        } else if (valueDate.toDateString() == yesterday.toDateString()) {
            agoText = $filter('translate')('YESTERDAY');
        } else {
            timeAgo = Math.round(timeAgo) + ' ';
            agoText = $filter('translate')('AGO', { data: timeAgo + unit });
        }
        // else if (!(value % 7)) {
        //     unit = value == 7 ? 'week' : 'weeks';
        // }
        // return $filter('translate')('AGO', { data: timeAgo + unit });
        return agoText;
    };
}])

.filter('average', function () {
    return function (value) {
        return parseInt(value);
    };
})

.filter('days', function () {
    return function (value) {
        return value += ' day' + (value > 1 ? 's' : '');
    };
})

.factory('Utils', ['TIME', function (TIME) {
    return {

        formatSmallNumber: function (number) {
            return number > 9 ? number : '0' + number;
        },

        formatDateForInput: function (date) {
            var month = this.formatSmallNumber(date.getMonth() + 1),
                day = this.formatSmallNumber(date.getDate());

            return date.getFullYear() + '-' + month + '-' + day;
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

        getAverageDataBetweenRefuels: function (refuels, property) {
            var total = 0,
                i = 0,
                length = refuels.length - 1;

            for (; i < length; i++) {
                total += (refuels[i][property] - refuels[i + 1][property]);
            }

            return total / length;
        },

        getAverageDistanceBetweenRefuels: function (refuels) {
            return this.getAverageDataBetweenRefuels(refuels, 'overallKilometers');
        },

        getAverageTimeBetweenRefuels: function (refuels) {
            var milliseconds = this.getAverageDataBetweenRefuels(refuels, 'date');

            return this.convertTime(milliseconds, TIME.DAYS);
        },

        getMakes: function () {
            return _.sortBy([{
                make: 'Asia',
                models: [
                    'Topic',
                    'Towner',
                    'Other'
                ]
            }, {
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
            }, {
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
            }, {
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
            }, {
                make: 'Chrysler',
                models: [
                    '300 C',
                    'Stratus',
                    'Other'
                ]
            }, {
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
            }, {
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
            }, {
                make: 'Daihatsu',
                models: [
                    'Applause',
                    'Charade',
                    'Cuore',
                    'Hijet',
                    'Sirion',
                    'Terios'
                ]
            }, {
                make: 'Dodge',
                models: [
                    'Caravan',
                    'Journey',
                    'Ram',
                    'Other'
                ]
            }, {
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
            }, {
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
            }, {
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
            }, {
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
            }, {
                make: 'Isuzu',
                models: [
                    'Pick-Up',
                    'Other'
                ]
            }, {
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
            }, {
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
            }, {
                make: 'Land Rover',
                models: [
                    'Discovery',
                    'Freelander',
                    'Other'
                ]
            }, {
                make: 'MG',
                models: [
                    'Other'
                ]
            }, {
                make: 'Mazda',
                models: [
                    '323',
                    'B2500',
                    'BT-50',
                    'Other'
                ]
            }, {
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
            }, {
                make: 'Mini',
                models: [
                    'Cooper',
                    'Cooper S'
                ]
            }, {
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
            }, {
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
            }, {
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
            }, {
                make: 'Porsche',
                models: [
                    '911',
                    'Other'
                ]
            }, {
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
            }, {
                make: 'Rover',
                models: [
                    '214',
                    '416',
                    '620',
                    'Maestro',
                    'Other'
                ]
            }, {
                make: 'Seat',
                models: [
                    'Cordoba',
                    'Toledo',
                    'Other'
                ]
            }, {
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
            }, {
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
            }, {
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
            }, {
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
            }, {
                make: 'Volvo',
                models: [
                    '460',
                    'S40',
                    'S60',
                    'Other'
                ]
            }, {
                make: 'Other',
                models: [
                    'Other'
                ]
            }], 'make');
        },

        getUnits: function (typeOfUnit) {
            var units = {
                'capacity': {
                    'lt': {
                        'name': 'Litres',
                        'unitDisplay': 'lts'
                    },
                    'gal': {
                        'name': 'Gallons',
                        'unitDisplay': 'gals'
                    }
                },
                'distance': {
                    'km': {
                        'name': 'Kilometres',
                        'unitDisplay': 'kms'
                    },
                    'mile': {
                        'name': 'Miles',
                        'unitDisplay': 'miles'
                    }
                }
            };

            return typeOfUnit ? units[typeOfUnit] : units;
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

        isNight: function () {
            var hours = new Date().getHours();
            return  hours < 7 || hours > 19;
        },

        convertTime: function (milliseconds, timeUnit) {
            var millisecondsToSeconds = function (milliseconds) {
                    return milliseconds / 1000;
                },
                millisecondsToMinutes = function (milliseconds) {
                    return millisecondsToSeconds(milliseconds) / 60;
                },
                millisecondsToHours = function (milliseconds) {
                    return millisecondsToMinutes(milliseconds) / 60;
                },
                millisecondsToDays = function (milliseconds) {
                    return millisecondsToHours(milliseconds) / 24;
                },
                millisecondsToMonths = function (milliseconds) {
                    // we use 30.4166666667 days here, but maybe we need to investigate which is the best way
                    // http://www.convertunits.com/from/days/to/month
                    return millisecondsToDays(milliseconds) / 30.4166666667;
                },
                millisecondsToYears = function (milliseconds) {
                    return millisecondsToMonths(milliseconds) / 12;
                };

            switch (timeUnit) {
                case TIME.SECONDS:
                    return millisecondsToSeconds(milliseconds);
                case TIME.MINUTES:
                    return millisecondsToMinutes(milliseconds);
                case TIME.HOURS:
                    return millisecondsToHours(milliseconds);
                case TIME.DAYS:
                    return millisecondsToDays(milliseconds);
                case TIME.MONTHS:
                    return millisecondsToMonths(milliseconds);
                case TIME.YEARS:
                    return millisecondsToYears(milliseconds);
            }

            return milliseconds;
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
            if (newCar.byDefault && currentDefaultCar._id && newCar._id !==
                currentDefaultCar._id) {
                currentDefaultCar.byDefault = false;
                currentDefaultCar.$save();
            }
        },

        turnOnDefaultCar: function (Car, newCar) {
            if (!Car.query().length) {
                newCar.byDefault = true;
            }
        },

        calculateDays: function (dateBefore, dateAfter) {
            var oneDay = 24 * 60 * 60 * 1000, // hours * minutes * seconds * milliseconds
                dateBeforeMs = new Date(dateBefore).getTime(),
                dateAfterMs = new Date(dateAfter).getTime();

            // parseFloat instead of Math.round so the filter can know if is less than a day
            // Math round is in the filter (timeAgo)
            return parseFloat(Math.abs((dateBeforeMs - dateAfterMs) / (
                oneDay)));
        },

        hideSplahscreen: function () {
            setTimeout(function () {
                navigator.splashscreen && navigator.splashscreen.hide();
            }, 1000);
        },

        // this plugin is required
        // cordova plugin add org.apache.cordova.network-information
        network: {

            attempt: 1,

            get: function () {
                return navigator.connection && navigator.connection.type;
            },

            isOnline: function (isOnlineCallback, isOfflineCallback) {
                var self = this;
                // in android the plugin is not ready instantly
                setTimeout(function () {
                    var networkState = self.get(),
                        isOnline;
                    // alert(networkState);
                    if (networkState === 0 && self.attempt < 4) {
                        self.attempt++;
                        self.isOnline(isOnlineCallback, isOfflineCallback);
                    } else {
                        self.attempt = 1;
                        isOnline = networkState !== 0 && networkState !== 'unknown' &&
                            networkState !== 'none';
                        if (isOnline) {
                            typeof isOnlineCallback === 'function' && isOnlineCallback();
                        } else {
                            typeof isOfflineCallback === 'function' && isOfflineCallback();
                        }
                    }
                }, 500);
            }
        }
    };
}])

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
                    (singleModel ? models : _.findWhere(models, {
                        _id: this._id
                    })),
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
                    _.findWhere(models, {
                        _id: this._id
                    }).inactive = true;
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
                    quality: 50,
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
}])

.factory('Flickr', ['$q', '$resource', function ($q, $resource) {
    var flickrSearch = $resource('https://api.flickr.com/services/rest/', {
        method: 'flickr.photos.search',
        jsoncallback: 'JSON_CALLBACK',
        api_key: 'c49a72ec017c4cf6e5c7c019e9f4a1bf',
        format: 'json'
    }, {
        get: {
            method: 'JSONP'
        }
    });

    return {
        search: function (options) {
            var q = $q.defer();

            flickrSearch.get(options, q.resolve, q.reject);

            return q.promise;
        }
    };
}]);

// .factory('UnitsService', function() {

//     var selectedUnits = {};

//     var getUnits = function(typeOfUnit) {
//         return units[typeOfUnit];
//     };
//     var setUnit = function(typeOfUnit, unit) {
//         selectedUnits[typeOfUnit] = unit;
//     };
//     var getSelectedUnit = function(typeOfUnit) {
//         return selectedUnits[typeofUnit];
//     };

//     return {
//         getUnits: getUnits,
//         setUnit: setUnit,
//         getSelectedUnit: getSelectedUnit
//     };
// });
