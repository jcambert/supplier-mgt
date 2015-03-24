'use strict';
var app = angular.module('com.module.contacts');

app.service('ContactsService', ['CoreService', 'gettextCatalog', 'Contact', function (CoreService, gettextCatalog, Contact) {

  this.getContacts = function () {
    return Contact.find(/*{
      filter: {
        order: 'created DESC'
      }
    }*/).$promise;
  };

 
  
  this.getContacts = function (id) {
    return Contact.findById({id: id}).$promise;
  };

  this.deleteContact = function (id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Deleting this cannot be undone'), function () {
      Contact.deleteById(id, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Contact deleted'), gettextCatalog.getString('Your contact has been deleted!'));
        cb();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString('Oops'), gettextCatalog.getString('Error deleting contact: ') + err);
        cb();
      });
    }, function () {
      return false;
    });
  };

}]);
