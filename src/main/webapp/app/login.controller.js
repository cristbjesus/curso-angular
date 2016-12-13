(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$window'];
    function LoginController($http, $window) {
        var vm = this;

        vm.logar = logar;

        activate();

        ////////////////

        function activate() {
            vm.user = {};
        }

        function logar() {
            $http.post('/curso-angular/authc', null, {
                headers: {
                    'Authorization': 'Basic ' + $window.btoa(vm.user.login + ':' + vm.user.password)
                }
            }).then(function () {
                $window.location.href = 'http://localhost:8080/curso-angular/index.html';
            });
        }
    }
})();