(function () {
    'use strict';

    angular
        .module('unsafeFilter', [])
        .filter('unsafe', unsafe);

    function unsafe($sce) {
        return $sce.trustAsHtml;
    }
})();