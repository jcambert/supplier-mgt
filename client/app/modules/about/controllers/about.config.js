'use strict';
angular.module('com.module.about')
  .run(function ($rootScope, gettextCatalog) {
	//if($rootScope.isAdmin)
	console.dir('About module run');
		$rootScope.addDashboardBox(gettextCatalog.getString('About'), 'bg-maroon', 'ion-information', 0, 'app.about.index');

  });
