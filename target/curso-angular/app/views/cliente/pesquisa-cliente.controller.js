(function() {
'use strict';

    angular
        .module('app')
        .controller('PesquisaClienteController', PesquisaClienteController);

    PesquisaClienteController.$inject = ['$scope', 'ClienteResource', '$state'];
    function PesquisaClienteController($scope, ClienteResource, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            listarClientes();
            $scope.$on('senaiGrid:edit:gridClientes', editarCliente);
            $scope.$on('senaiGrid:remove:gridClientes', excluirCliente);
        }

        function listarClientes() {
            // $http({
            //     method: 'GET',
            //     url: '/url'
            // });
            vm.clientes = ClienteResource.query();
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