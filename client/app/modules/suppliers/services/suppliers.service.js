'use strict';
var app = angular.module('com.module.suppliers',['com.module.contacts']);

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

  this.count = function(cb){
	 Supplier.count(function(count){
		cb(count.count);
	});
  };
  
  this.unlinkSector = function(id,sectorId,cb){
	 CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Do you really want to unlink'), function () {
      Supplier.sectors.unlink({id:id,fk:sectorId}, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Supplier/Sector unlinked'), gettextCatalog.getString('You are unlinked the supplier and the sector!'));
        cb();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString('Oops'), gettextCatalog.getString('Error while unlinking sector: ') + err);
        cb();
      });
    }, function () {
      return false;
    });
  };
  
  this.linkSector = function(id,sectorId,cb){
	 CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Do you really want to link'), function () {
	 console.log('Link supplier id:'+id+' with sector id:'+sectorId);
      Supplier.sectors.link({id:id,fk:sectorId},{}, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Supplier/Sector linked'), gettextCatalog.getString('You are linked the supplier and the sector!'));
        cb();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString('Oops'), gettextCatalog.getString('Error while linking sector: ') + err);
        cb();
      });
    }, function () {
      return false;
    });
  };
  
  this.createBlankContact=function(id){
	var contact={supplierId:id,first_name:''};
	
  }
}]);
