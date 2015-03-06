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
			return SuppliersService.getSuppliers();
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
  
  
  //Contacts Routes
	.state ('app.contacts', {
		abstract: true,
		url: '/contacts',
		templateUrl: 'modules/suppliers/views/contacts/main.html'
	  })
	.state ('app.contacts.list', {
		url: '',
		templateUrl: 'modules/suppliers/views/contacts/list.html',
		resolve: {
		  contacts: ['ContactsService', function (SuppliersService) {
			return SuppliersService.getSuppliers();
		  }]
		},
		 controller: function ($scope,$state, contacts,ContactsService) {
		  $scope.contacts = contacts;
		  $scope.delete = function (id) {
			  ContactsService.deleteContact(id, function () {
				$state.reload();
			  });
			};
		}
	  })
	.state ('app.contacts.add', {
		url: '/add/',
		templateUrl: 'modules/suppliers/views/contacts/form.html',
		controller: 'contactsCtrl'
	  })
	.state ('app.contacts.edit', {
		url: '/:id/edit',
		templateUrl: 'modules/suppliers/views/contacts/form.html',
		controller: 'contactsCtrl'
	  })
	.state ('app.contacts.view', {
		url: '/:id',
		templateUrl: 'modules/suppliers/views/contacts/view.html',
		controller: 'suppliersCtrl'
	  })
	  
	  
	;
});
