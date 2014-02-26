angular.module('CarGas.Main')
.directive('slideMenu', ['$swipe', function ($swipe) {
    // return the directive link function. (compile function not needed)
    return function (scope, element, attrs) {

        var config = {};

        config.start = function (data) {
            element.data('start', data.x);
        };

        config.move = function (data) {
            debugger;
            var start = element.data('start'),
                left = parseInt(element.css('left'), 10) || 0,
                moved = data.x - start + left;

            // reset the start
            config.start({ x: data.x });

            if (moved > 0 && moved < 200) {
                element
                    .data('moved', moved)
                    .css({ left: (left + moved) + 'px' });
            }

        };

        config.end = config.cancel = function (data) {
            element
                .removeData('start')
                .removeData('moved');
        };

        $swipe.bind(element, config);

    };
}]);