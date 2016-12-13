(function() {
'use strict';

    angular
        .module('app')
        .controller('PesquisaClienteController', PesquisaClienteController);

    PesquisaClienteController.$inject = ['$rootScope', '$scope', 'ClienteResource', '$state'];
    function PesquisaClienteController($rootScope, $scope, ClienteResource, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $rootScope.pageClass = 'page-about';

            listarClientes();

            $scope.$on('senaiGrid:edit:gridClientes', editarCliente);
            $scope.$on('senaiGrid:remove:gridClientes', excluirCliente);

            vm.clientesSelecionados = [];
        }

        function listarClientes() {
            // $http({
            //     method: 'GET',
            //     url: '/url'
            // });
            vm.clientes = ClienteResource.query();
            vm.promiseListarClientes = vm.clientes.$promise;
        }

        function editarCliente(event, data) {
            var cliente = data.item;
            $state.go('^.cadastro', {id: cliente.id});
        }

        function excluirCliente(event, data) {
            var cliente = data.item;
            ClienteResource.remove({id: cliente.id}, listarClientes);
        }
    }
})();