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

	$scope.onAddSupplier = function(supplierId){
		//Supplier.sectors.upsert(
	}
	
    $scope.onSubmit = function () {
      Sector.upsert($scope.sector, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Sector saved'), gettextCatalog.getString('Your sector is safe with us!'));
        $state.go('^.list');
      }, function (err) {
        console.log(err);
      });
    };

  });
