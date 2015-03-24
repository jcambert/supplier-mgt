'use strict';
angular.module ('com.module.contacts',[])
  .config (function ($stateProvider) {
  $stateProvider
	
  
  
  //Contacts Routes
	.state ('app.contacts', {
		abstract: true,
		url: '/contacts',
		templateUrl: 'modules/contacts/views/main.html'
	  })
	.state ('app.contacts.list', {
		url: '',
		templateUrl: 'modules/contacts/views/list.html',
		resolve: {
		  contacts: ['ContactsService', function (contactsService) {
			return ContactsService.getContacts();
		  }]
		},
		 controller: function ($scope,$state, contacts,ContactsService) {
			conole.log('toto');
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
		templateUrl: 'modules/contacts/views/form.html',
		controller: 'contactsCtrl'
	  })
	.state ('app.contacts.edit', {
		url: '/:id/edit',
		templateUrl: 'modules/contacts/views/form.html',
		controller: 'contactsCtrl'
	  })
	.state ('app.contacts.view', {
		url: '/:id',
		templateUrl: 'modules/contacts/views/view.html',
		controller: 'contactsCtrl'
	  })
	  
	  
	;
});
