(function() {
'use strict';

    angular
        .module('app')
        .controller('GridClientesBottomSheetController', GridClientesBottomSheetController);

    GridClientesBottomSheetController.$inject = ['$mdBottomSheet'];
    function GridClientesBottomSheetController($mdBottomSheet) {
        var vm = this;

        vm.listItemClick = listItemClick;
        

        activate();

        ////////////////

        function activate() { 
            vm.items = [
                { action: 'edit', name: 'Editar', icon: 'fa-pencil' },
                { action: 'remove', name: 'Excluir', icon: 'fa-times' }
            ];
        }

        function listItemClick($index) {
            var clickedItem = vm.items[$index];
            $mdBottomSheet.hide(clickedItem);
        }
    }
})();