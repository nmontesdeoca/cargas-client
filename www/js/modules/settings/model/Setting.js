angular.module('settings')

.factory('Setting', ['Model',
    function (Model) {
    	var model = Model('settings', true);
    	
    	model.initialize = function() {
    		var settings = model.query(),
    			
    			defaultSettings = {
    				selectedUnits: {
    					'capacity': 'lt',
    					'distance': 'km'
    				}
    			};

    		if (!settings.hasOwnProperty('_id')) {
    			settings.set(defaultSettings);
    			settings.$save();
    		} 

    	};
        return model;
    }
]);
