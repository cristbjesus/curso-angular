(function() {
'use strict';

    angular
        .module('app')
        .factory('ClienteResource', ClienteResource);

    ClienteResource.$inject = ['$resource'];
    function ClienteResource($resource) {
        return $resource('/curso-angular/rest/cliente/:id');
    }
})();