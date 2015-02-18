'use strict';
var app = angular.module('com.module.suppliers');

app.service('SuppliersService', ['CoreService', 'gettextCatalog', 'Supplier', function (CoreService, gettextCatalog, Supplier) {

  this.getSuppliers = function () {
    return Supplier.find(/*{
      filter: {
        order: 'created DESC'
      }
    }*/).$promise;
  };

  this.getSupplier = function (id) {
    return Supplier.findById({id: id}).$promise;
  };

  this.deleteSupplier = function (id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Deleting this cannot be undone'), function () {
      Supplier.deleteById(id, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Supplier deleted'), gettextCatalog.getString('Your supplier has been deleted!'));
        cb();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString('Oops'), gettextCatalog.getString('Error deleting supplier: ') + err);
        cb();
      });
    }, function () {
      return false;
    });
  };

}]);
