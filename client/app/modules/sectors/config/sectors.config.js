'use strict';
angular.module('com.module.sectors')
  .run(function ($rootScope, Sector, gettextCatalog) {
    
	
	$rootScope.addMenu(gettextCatalog.getString('Sectors'), 'app.sectors.list', 'fa-file',false);
	Sector.find(function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Sectors'), 'bg-yellow', 'ion-ios7-cart-outline', data.length, 'app.sectors.list',false);
    });
  });

