(function () {
    'use strict';

    angular
        .module('cars', [])
        .config(config);

    config.$inject = ['$compileProvider'];

    function config($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|content):/);
    }

})();
