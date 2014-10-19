angular.module('settings')

.factory('Setting', ['Model', '$translate', 'VALID_LANGUAGES',
    function (Model, $translate, VALID_LANGUAGES) {
    	var model = Model('settings', true);

    	model.prototype.initialize = function () {
            this.set({
                selectedUnits: {
                    capacity: 'lt',
                    distance: 'km'
                }
            });

            navigator.globalization &&
                navigator.globalization.getPreferredLanguage(_.bind(this.setPreferredLanguage, this));

            this.$save();
    	};

        model.prototype.setPreferredLanguage = function (language) {
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
