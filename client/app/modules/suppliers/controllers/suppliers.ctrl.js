'use strict';
angular.module('com.module.suppliers')
  .controller('suppliersCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Supplier, SuppliersService) {

    var supplierId = $stateParams.id;

	if (supplierId) {
      $scope.supplier = Supplier.findById({filter:{include:['sectors']}},{
        id: supplierId
      }, function (supplier) {
		console.dir(supplier);
		
      }, function (err) {
        console.log(err);
      });
    } else {
      $scope.supplier = {};
    }

    $scope.delete = function (id) {
      SuppliersService.deleteSupplier(id, function () {
        $state.reload();
      });
    };

	Supplier.find({filter:{include:['sectors']}},function(supplier){
		console.dir(supplier);
	});
   

    $scope.formFields = [
      {
        key: 'name',
        type: 'text',
        label: gettextCatalog.getString('Name'),
        required: true
      },
	  {
        key: 'address1',
        type: 'text',
        label: gettextCatalog.getString('Address 1')
      },
	  {
        key: 'address2',
        type: 'text',
        label: gettextCatalog.getString('Address 2')
      },
	  {
        key: 'postal_code',
        type: 'text',
        label: gettextCatalog.getString('Postal Code')
      },
	  {
        key: 'city',
        type: 'text',
        label: gettextCatalog.getString('City')
      },
	  {
        key: 'country',
        type: 'text',
        label: gettextCatalog.getString('Country')
      },
	  {
        key: 'internet_site',
        type: 'text',
        label: gettextCatalog.getString('Internet Site')
      },
	  {
        key: 'keywords',
        type: 'textarea',
        label: gettextCatalog.getString('Keywords	')
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
      Supplier.upsert($scope.supplier, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Supplier saved'), gettextCatalog.getString('Your supplier is safe with us!'));
        $state.go('^.list');
      }, function (err) {
        console.log(err);
      });
    };

  });
