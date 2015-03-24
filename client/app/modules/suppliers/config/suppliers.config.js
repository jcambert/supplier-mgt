'use strict';
angular.module('com.module.suppliers')
  .run(function ($rootScope, Supplier, Sector, gettextCatalog) {
	console.log('SUPPLIERS RUN');
    $rootScope.addMenu(gettextCatalog.getString('Suppliers'), 'app.suppliers.list', 'fa-file',false);
    Supplier.find(function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Suppliers'), 'bg-yellow', 'ion-ios7-cart-outline',{name:'suppliers_count',quantity: data.length}, 'app.suppliers.list',false);
    });

	
	
  });

