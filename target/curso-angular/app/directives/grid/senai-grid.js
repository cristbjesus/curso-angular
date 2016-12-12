(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('senaiGridModule')
        .component('senaiGrid', {
            templateUrl: 'app/directives/grid/senai-grid.html',
            transclude: true,
            controller: GridController,
            bindings: {
                provider: '<',
                disableRemove: '<',
                disableEdit: '<',
                disableSort: '<',
                enableSelection: '<',
                rowClass: '@'
            }
        });

    GridController.$inject = ['$parse', '$scope', '$filter', '$attrs'];
    function GridController($parse, $scope, $filter, $attrs) {
        var $ctrl = this;

        $ctrl.addColumn = addColumn;
        $ctrl.getValue = getValue;
        $ctrl.selectRow = selectRow;
        $ctrl.edit = edit;
        $ctrl.remove = remove;
        $ctrl.sort = sort;
        $ctrl.getRowClass = getRowClass;

        var _currentSortedColumn = null;

        $ctrl.$onInit = function () {
            $ctrl.selectedRowIndex = -1;
            $ctrl.columns = [];
        };

        function addColumn(column) {
            $ctrl.columns.push(column);
        }

        function getValue(item, column) {
            /* jshint validthis: true */
            var value = column.property ? $parse(column.property)(item) : null;

            if (column.labelFilter) {
                var filterArguments = angular.extend([], column.labelFilterArguments);
                filterArguments.unshift(value);
                return $filter(column.labelFilter).apply(this, filterArguments);
                // return $filter('date')(value, 'dd/MM/yyyy');
            } else {
                return value;
            }
        }

        function selectRow(rowIndex) {
            if ($ctrl.enableSelection) {
                $ctrl.selectedRowIndex = rowIndex;

                $scope.$emit('senaiGrid:select:' + $attrs.id, {
                    rowIndex: rowIndex,
                    item: $ctrl.provider[rowIndex]
                });
            }
        }

        function edit(rowIndex) {
            $scope.$emit('senaiGrid:edit:' + $attrs.id, {
                rowIndex: rowIndex,
                item: $ctrl.provider[rowIndex]
            });
        }

        function remove(rowIndex) {
            $scope.$emit('senaiGrid:remove:' + $attrs.id, {
                rowIndex: rowIndex,
                item: $ctrl.provider[rowIndex]
            });
        }

        function sort(column) {
            if (column && column.property && !column.disableSort) {
                if (_currentSortedColumn && _currentSortedColumn !== column) {
                    _currentSortedColumn.sortOrder = null;
                }

                _currentSortedColumn = column;

                switch (_currentSortedColumn.sortOrder) {
                    case 'asc':
                        _currentSortedColumn.sortOrder = 'desc';
                        break;
                    case 'desc':
                        _currentSortedColumn.sortOrder = null;
                        break;
                    default:
                        _currentSortedColumn.sortOrder = 'asc';
                        break;
                }

                $scope.$emit('senaiGrid:sort:' + $attrs.id, _currentSortedColumn);
            }
        }

        function getRowClass(index) {
            return $ctrl.selectedRowIndex === index ? $ctrl.rowClass : '';
        }
    }
})();