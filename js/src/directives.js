angular.module('CarGas')
.directive('leftNavigation', function () {
    return {
        restrict: 'A',
        template:
            '<a ng-repeat="tab in tabs" href="{{ tab.href }}">' +
                '<i class="fa fa-2x {{ tab.icon }}"></i>' +
                '<div class="tab-label">{{ tab.text }}</div>' +
            '</a>',
        link: function (scope, element) {
            element
                .addClass('main-nav')
                .addClass('pull-left');
        }
    };
});
