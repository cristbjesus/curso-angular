(function () {
    'use strict';

    angular
        .module('app')
        .controller('CadastroClienteController', CadastroClienteController);

    CadastroClienteController.$inject = ['$stateParams', 'ClienteResource', '$state'];
    function CadastroClienteController($stateParams, ClienteResource, $state) {
        var vm = this;

        vm.irParaPesquisa = irParaPesquisa;
        vm.salvarCliente = salvarCliente;

        activate();

        ////////////////

        function activate() {
            consultarCliente();
        }

        function consultarCliente() {
            if ($stateParams.id) {
                vm.cliente = ClienteResource.get({ id: $stateParams.id });
            }
        }

        function irParaPesquisa() {
            $state.go('^.pesquisa');
        }

        function salvarCliente() {
            if (vm.cliente) {
                if (angular.isFunction(vm.cliente.$save)) {
                    vm.cliente.$save(irParaPesquisa);
                } else {
                    ClienteResource.save(vm.cliente, irParaPesquisa);
                }
            }
        }
    }
})();