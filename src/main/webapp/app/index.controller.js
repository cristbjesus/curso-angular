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
            vm.currentNavItem = 'pesquisaClientes';
        }
    }
})();