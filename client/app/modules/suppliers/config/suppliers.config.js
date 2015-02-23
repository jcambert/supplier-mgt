'use strict';
angular.module('com.module.suppliers')
  .run(function ($rootScope, Supplier, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Suppliers'), 'app.suppliers.list', 'fa-file',false);

    Supplier.find(function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Suppliers'), 'bg-yellow', 'ion-ios7-cart-outline', data.length, 'app.suppliers.list',false);
    });

 

  });

