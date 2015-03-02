'use strict';
var app = angular.module('com.module.sectors');

app.service('SectorsService', ['CoreService', 'gettextCatalog', 'Sector', function (CoreService, gettextCatalog, Sector) {

  this.getSectors = function () {
    return Sector.find(/*{
      filter: {
        order: 'created DESC'
      }
    }*/).$promise;
  };

  this.getSectorsWithSuppliers = function () {
    return Sector.find({filter:{include:['suppliers']}}/*{
      filter: {
        order: 'created DESC'
      }
    }*/).$promise;
  };
  this.getSector = function (id) {
    return Sector.findById({id: id}).$promise;
  };

  this.deleteSector = function (id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Deleting this cannot be undone'), function () {
      Sector.deleteById(id, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Sector deleted'), gettextCatalog.getString('Your sector has been deleted!'));
        cb();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString('Oops'), gettextCatalog.getString('Error deleting sector: ') + err);
        cb();
      });
    }, function () {
      return false;
    });
  };

}]);
