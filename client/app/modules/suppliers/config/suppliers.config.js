'use strict';
angular.module('com.module.suppliers')
  .run(function ($rootScope, Supplier, Contact, Sector, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Suppliers'), 'app.suppliers.list', 'fa-file',false);
    Supplier.find(function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Suppliers'), 'bg-yellow', 'ion-ios7-cart-outline',{name:'suppliers_count',quantity: data.length}, 'app.suppliers.list',false);
	  
	  
    });

	$rootScope.addMenu(gettextCatalog.getString('Contacts'), 'app.contacts.list', 'fa-file',false);
	Contact.find(function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Contacts'), 'bg-yellow', 'ion-ios7-cart-outline',{name:'contacts_count',quantity: data.length}, 'app.contacts.list',false);
    });
	
	
  });

