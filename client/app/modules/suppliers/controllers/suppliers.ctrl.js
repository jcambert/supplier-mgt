'use strict';
angular.module('com.module.suppliers')
  .controller('suppliersCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Supplier, SuppliersService) {

    var supplierId = $stateParams.id;

	if (supplierId) {
      $scope.supplier = Supplier.findById({
        id: supplierId
      }, function () {
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

   

    $scope.formFields = [
      {
        key: 'name',
        type: 'text',
        label: gettextCatalog.getString('Name'),
        required: true
      },
	  {
        key: 'description',
        type: 'text',
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
