angular.module('settings')

.factory('Setting', ['Model', '$translate', '$state', 'VALID_LANGUAGES',
    function (Model, $translate, $state, VALID_LANGUAGES) {
        var model = Model('settings', true);

        model.prototype.initialize = function () {
            this.set({
                selectedUnits: {
                    capacity: 'lt',
                    distance: 'km',
                    consumption: 'kml'
                }
            });

            navigator.globalization &&
                navigator.globalization.getPreferredLanguage(_.bind(this.setPreferredLanguage,
                    this));

            this.$save(function () {
                $state.go('intro');
            });
        };

        model.prototype.setPreferredLanguage = function (language) {
            this.locale = language;
            this.language = language.value.split('-').shift();
            if (!_.contains(VALID_LANGUAGES, this.language)) {
                this.language = 'en';
            }
            $translate.use(this.language);
            // we perform a $save here because this is asynchronous
            this.$save();
        };

        return model;
    }
]);
