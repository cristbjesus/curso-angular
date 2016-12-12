(function () {
    'use strict';

    angular
        .module('app')
        .controller('CadastroClienteController', CadastroClienteController);

    CadastroClienteController.$inject = ['$stateParams', 'ClienteResource', '$state'];
    function CadastroClienteController($stateParams, ClienteResource, $state) {
        var vm = this;

        vm.salvarCliente = salvarCliente;

        activate();

        ////////////////

        function activate() {
            consultarCliente();
        }

        function consultarCliente() {
            if ($stateParams.id) {
                vm.cliente = ClienteResource.get({ id: $stateParams.id });
                // vm.cliente = ClienteResource.get({ id: $stateParams.id }, onConsultarClienteSuccessHandler);
            }
        }

        // function onConsultarClienteSuccessHandler(cliente) {
        //     cliente.dataNascimento = moment(cliente.dataNascimento).toDate();
        // }

        function salvarCliente() {
            vm.cliente.$save(irParaPesquisa);
        }

        function irParaPesquisa() {
            $state.go('^.pesquisa');
        }
    }
})();