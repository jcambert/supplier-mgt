'use strict';
angular.module('com.module.sectors')
  .controller('sectorsCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Sector,  SectorsService) {

    var sectorId = $stateParams.id;
	
	if (sectorId) {
      $scope.sector = Sector.findById({filter:{include:['suppliers']}},{
        id: sectorId
      }, function (sector) {
		console.dir(sector);
		
      }, function (err) {
        console.log(err);
      });
    } else {
      $scope.sector = {};
    }

    $scope.delete = function (id) {
      SectorsService.deleteSector(id, function () {
        $state.reload();
      });
    };
   
	

    $scope.formFields = [
	  {
        key: 'name',
        type: 'text',
        label: gettextCatalog.getString('Name'),
        required: true
      },
	  {
        key: 'description',
        type: 'textarea',
        label: gettextCatalog.getString('Description'),
        required: true
      }
    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };


	
    $scope.onSubmit = function () {
      Sector.upsert($scope.sector, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Sector saved'), gettextCatalog.getString('Your sector is safe with us!'));
        $state.go('^.list');
      }, function (err) {
        console.log(err);
      });
    };

  })
  
  .controller('sectorsSupplierCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Sector,  SectorsService, SuppliersService, Supplier) {
	 var sectorId = $stateParams.id;
	
	if (sectorId) {
      $scope.sector = Sector.findById({filter:{include:['suppliers']}},{
        id: sectorId
      }, function (sector) {
		console.dir(sector);
		
      }, function (err) {
        console.log(err);
      });
    } else {
      $scope.sector = {};
    }
	
	
	function loadSuppliers(){
		SuppliersService.getSuppliers().then(function(suppliers){
			var idx=-1;
			idx=_.findLastIndex($scope.formFields,function(c){ return c.key=='supplierId';});
			_.map(suppliers,function(supplier){
				$scope.formFields[idx].options.push({"value":supplier.id,"name":supplier.name});
			});
		});
	}
	
	
	$scope.linkSupplier = function(){
		console.dir($scope.sector);
		//Supplier.sectors.link({'id':1,'fk':2},{}, function (err) {$state.go('^.list');});
		SuppliersService.linkSector($scope.sector.supplierId,$scope.sector.id,function(){
			$state.go('^.list');
		});
		
	};
	
	$scope.formFields = [
	  {
        key: 'supplierId',
        type: 'select',
        label: gettextCatalog.getString('Name'),
        required: true,
		options: []
      }
    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };
	
	
	loadSuppliers();
  })
  ;
