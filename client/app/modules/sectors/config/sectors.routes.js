'use strict';
angular.module ('com.module.sectors')
  .config (function ($stateProvider) {
  console.log('Config Sector routes');
  $stateProvider
	
	 //Sectors Routes
	.state ('app.sectors', {
		abstract: true,
		url: '/sectors',
		templateUrl: 'modules/sectors/views/main.html'
	  })
	.state ('app.sectors.list', {
		url: '',
		templateUrl: 'modules/sectors/views/list.html',
		resolve: {
		  sectors: ['SectorsService', function (SectorsService) {
			return SectorsService.getSectorsWithSuppliers();
		  }]
		},
		 controller: function ($scope,$state,   sectors,SectorsService,SuppliersService) {
		  $scope.sectors = sectors;
		 
		  $scope.unlinkSupplier = function(id){
			SuppliersService.unlinkSector(id.supplierId,id.sectorId,function(){$state.reload();})
		  };
		  $scope.delete = function (id) {
			  SectorsService.deleteSector(id, function () {
				$state.reload();
			  });
			};
		}
	  })
	.state ('app.sectors.add', {
		url: '/add/',
		templateUrl: 'modules/sectors/views/form.html',
		controller: 'sectorsCtrl'
	  })
	.state ('app.sectors.edit', {
		url: '/:id/edit',
		templateUrl: 'modules/sectors/views/form.html',
		controller: 'sectorsCtrl'
	  })
	.state ('app.sectors.view', {
		url: '/:id',
		templateUrl: 'modules/sectors/views/view.html',
		controller: 'sectorsCtrl'
	  })
	.state ('app.sectors.supplieradd', {
		url: '/supplier/add/:id',
		templateUrl: 'modules/sectors/views/supplierform.html',
		controller: 'sectorsSupplierCtrl'
	  })
	;
});
