angular.module('CarGas.Main')
.directive('slideMenu', ['$swipe', function ($swipe) {
    // return the directive link function. (compile function not needed)
    return function (scope, element, attrs) {

        var config = {},
            start,
            moved,
            lastPosition,
            MAX = 258,
            MIN = 0,
            MID = (MAX - MIN) / 2;

        config.start = function (data) {
            element.css('transition', 'none');
            start = data.x;
            lastPosition = parseInt((element.css('webkitTransform').match(/\d+/) || ["0"])[0], 10);
        };

        config.move = function (data) {
            moved = data.x - start + lastPosition;
            
            if (moved > MIN && moved < MAX) {
                element.css('webkitTransform', 'translate(' + (moved) + 'px)');
            }
        };

        config.end = function (data) {
            start = 0;
            element.css('transition', 'all .3s ease');
            if (moved > MID) {
                element.css('webkitTransform', 'translate(' + (MAX) + 'px)');
            } else {
                element.css('webkitTransform', 'translate(' + (MIN) + 'px)');
            }
        };

        config.cancel = config.end;

        $swipe.bind(element, config);
    };
}]);