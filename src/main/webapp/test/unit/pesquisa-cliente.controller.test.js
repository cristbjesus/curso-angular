describe('PaginaClienteController', function() {

	beforeEach(module('SenaiModuloTemplates'));

	beforeEach(module('app'));
	
	var $rootScope, $scope, $state, growl, $mdBottomSheet, createController, mockClienteResource, queryDeferred;
	
	var mockClienteResourceResponse = [
        { id: 1, nome: 'Fulano' },
        { id: 2, nome: 'Ciclano' }
    ];
	
	beforeEach(inject(function(_$q_, _$rootScope_, _$state_, _growl_, _$mdBottomSheet_) {
		$q = _$q_;
		$rootScope = _$rootScope_;
		$state = _$state_;
		growl = _growl_;
		$mdBottomSheet = $mdBottomSheet;
	}));
	
	beforeEach(inject(function($injector) {
		$mdBottomSheet = $injector.get('$mdBottomSheet');
		
		mockClienteResource = {
			query: function() {
			    queryDeferred = $q.defer();
				
				var response = [];
				response.$promise = queryDeferred.promise;
				
				queryDeferred.promise.then(function() {
					response.push(mockClienteResourceResponse[0]);
					response.push(mockClienteResourceResponse[1]);
				});
				
			    return response;
			}
	    };
		
		spyOn(mockClienteResource, 'query').and.callThrough();
		
		var $controller = $injector.get('$controller');
		
		createController = function() {
	    	$scope = $rootScope.$new();
	    	return $controller('PesquisaClienteController', {
	    		'$scope': $scope,
				'$state': $state,
				'ClienteResource': mockClienteResource,
				'$mdBottomSheet': $mdBottomSheet
			});
	    };
	}));
	
	it ('Iniciar', inject(function() {
		var controller = createController();
		
		expect(controller.clientesSelecionados).toEqual([]);
		
		expect(controller.clientes.length).toBe(0);
		
		expect(mockClienteResource.query).toHaveBeenCalled();
		
		expect(controller.promiseListarClientes).toBe(queryDeferred.promise)
		
		queryDeferred.resolve(mockClienteResourceResponse);
		
		$rootScope.$apply();
		
		expect(controller.clientes.length).toBe(2);
	}));
});