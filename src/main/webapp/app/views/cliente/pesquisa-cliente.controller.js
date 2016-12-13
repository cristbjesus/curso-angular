(function () {
    'use strict';

    angular
        .module('app')
        .controller('PesquisaClienteController', PesquisaClienteController);

    PesquisaClienteController.$inject = ['$scope', 'ClienteResource', '$state', '$mdBottomSheet'];
    function PesquisaClienteController($scope, ClienteResource, $state, $mdBottomSheet) {
        var vm = this;

        vm.irParaCadastro = irParaCadastro;
        vm.onSelectCliente = onSelectCliente;

        activate();

        ////////////////

        function activate() {
            listarClientes();

            vm.clientesSelecionados = [];
        }

        function irParaCadastro(cliente) {
            var paramsPaginaCadastro = null;

            if (cliente) {
                paramsPaginaCadastro = { id: cliente.id }
            }

            $state.go('^.cadastro', paramsPaginaCadastro);
        }

        function onSelectCliente(cliente) {
            $mdBottomSheet.show({
                templateUrl: 'app/templates/bottom-sheet-list-template.html',
                controller: 'GridClientesBottomSheetController',
                controllerAs: 'bottomSheetCtrl'
            }).then(function (clickedItem) {
                switch (clickedItem.action) {
                    case 'edit':
                        irParaCadastro(cliente);
                        break;
                    case 'remove':
                        ClienteResource.remove({ id: cliente.id }, listarClientes);
                        break;
                }
            }).finally(function () {
                vm.clientesSelecionados = [];
            });
        }

        function listarClientes() {
            // $http({
            //     method: 'GET',
            //     url: '/url'
            // });
            vm.clientes = ClienteResource.query();
            vm.promiseListarClientes = vm.clientes.$promise;
        }
    }
})();