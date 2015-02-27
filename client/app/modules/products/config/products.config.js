'use strict';
angular.module('com.module.products')
  .run(function ($rootScope, Product, Category, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Products'), 'app.products.list', 'fa-file',false);
    Product.find({filter:{include:['category']}},function (data) {
		data=_.filter(data,function(d){return d.category.status==1;});
		$rootScope.addDashboardBox(gettextCatalog.getString('Products'), 'bg-yellow', 'ion-ios7-cart-outline', data.length, 'app.products.list',false);
    });
    Category.find({filter:{where:{'status':1}}}, function (data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Categories'), 'bg-aqua', 'ion-ios7-pricetag-outline', data.length, 'app.products.list',false);
    });
  });