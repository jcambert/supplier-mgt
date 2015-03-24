'use strict';
angular.module('com.module.contacts')
  .run(function ($rootScope,  Contact, Sector, gettextCatalog) {


	$rootScope.addMenu(gettextCatalog.getString('Contacts'), 'app.contacts.list', 'fa-file',false);
	Contact.find(function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Contacts'), 'bg-yellow', 'ion-ios7-cart-outline',{name:'contacts_count',quantity: data.length}, 'app.contacts.list',false);
    });
	
	
  });

