'use strict';
angular.module ('com.module.products')
  .config (function ($stateProvider) {
  $stateProvider
    .state ('app.products', {
    abstract: true,
    url: '/products',
    templateUrl: 'modules/products/views/main.html'
  })
    .state ('app.products.list', {
    url: '',
    templateUrl: 'modules/products/views/list.html',
    controller: 'ProductsCtrl'
  })
    .state ('app.products.add', {
    url: '/add/:categoryId',
	templateUrl: function($stateParams){
		return 'modules/products/views/' + $stateParams.categoryId + '/form.html';
	},
    controller: 'ProductsCtrl'
  })
    .state ('app.products.edit', {
    url: '/:categoryId/:id/edit',
	templateUrl: function($stateParams){
		return 'modules/products/views/' + $stateParams.categoryId + '/form.html';
	},
    controller: 'ProductsCtrl'
  })
    .state ('app.products.addcategory', {
    url: '/addcategory',
    templateUrl: 'modules/products/views/categoryform.html',
    controller: 'CategoriesCtrl'
  })

   .state ('app.products.view', {
    url: '/:categoryId/:id',
    templateUrl: function($stateParams){
		return 'modules/products/views/' + $stateParams.categoryId + '/view.html'
	},
    controller: 'ProductsCtrl'
  })
  
  .state ('app.products.report', {
    url: '/report/:categoryId',
	templateUrl: function($stateParams){
		return 'modules/products/views/' + $stateParams.categoryId + '/report.html';
	},
    controller: 'ReportProductsCtrl'
  })
  .state ('app.products.editcategory', {
    url: '/editcategory/:categoryId',
    templateUrl: 'modules/products/views/categoryform.html',
    controller: 'CategoriesCtrl'
  })
  .state ('app.products.updatecategory', {
    url: '/updatecategory/:categoryId',
    templateUrl: 'modules/products/views/updatecategory.html',
    controller: 'CategoriesCtrl'
  })
  ;
});
