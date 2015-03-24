'use strict';
angular.module ('com.module.suppliers')
  .config (function ($stateProvider) {
  $stateProvider
	//Suppliers Routes
    .state ('app.suppliers', {
		abstract: true,
		url: '/suppliers',
		templateUrl: 'modules/suppliers/views/main.html'
	  })
    .state ('app.suppliers.list', {
		url: '',
		templateUrl: 'modules/suppliers/views/list.html',
		resolve: {
		  suppliers: ['SuppliersService', function (SuppliersService) {
			return SuppliersService.getSuppliersWithContacts();
		  }]
		},
		 controller: function ($scope, $rootScope,$state, suppliers,SuppliersService) {
		  $scope.suppliers = suppliers;
		  $scope.delete = function (id) {
			  SuppliersService.deleteSupplier(id, function () {
				 SuppliersService.count(function(count){
					$rootScope['suppliers_count']=count;
					$state.reload();
				});
			  });
			};
		}
	  })
    .state ('app.suppliers.add', {
		url: '/add/',
		templateUrl: 'modules/suppliers/views/form.html',
		controller: 'suppliersCtrl'
	  })
    .state ('app.suppliers.edit', {
		url: '/:id/edit',
		templateUrl: 'modules/suppliers/views/form.html',
		controller: 'suppliersCtrl'
	  })

    .state ('app.suppliers.view', {
		url: '/:id',
		templateUrl: 'modules/suppliers/views/view.html',
		controller: 'suppliersCtrl'
	  })
  
  
  
	  
	  
	;
});
