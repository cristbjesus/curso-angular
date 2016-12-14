(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = [];
    function IndexController() {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            var doc = angular.element(document);
            vm.currentNavItem = 'pesquisaClientes';
        }
    }
})();