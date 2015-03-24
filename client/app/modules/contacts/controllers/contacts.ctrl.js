'use strict';
angular.module('com.module.contacts')
  .controller('contactsCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Contact, ContactsService) {

    var contactId = $stateParams.id;

	if (contactId) {
      $scope.contact = Contact.findById({
        id: contactId
      }, function () {
      }, function (err) {
        console.log(err);
      });
    } else {
      $scope.contact = {};
    }

    $scope.delete = function (id) {
      ContactsService.deleteSupplier(id, function () {
        $state.reload();
      });
    };

   

    $scope.formFields = [
      {
        key: 'first_name',
        type: 'text',
        label: gettextCatalog.getString('First Name'),
        required: true
      },
	  {
        key: 'last_name',
        type: 'text',
        label: gettextCatalog.getString('First Name')
      },
	  {
        key: 'phone',
        type: 'text',
        label: gettextCatalog.getString('First Name')
      },
	  {
        key: 'email',
        type: 'email',
        label: gettextCatalog.getString('First Name')
      },
	  {
        key: 'description',
        type: 'text',
        label: gettextCatalog.getString('Description')
      },
	  {
        key: 'keywords',
        type: 'text',
        label: gettextCatalog.getString('Keywords')
      },
	  
    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function () {
      Contact.upsert($scope.contact, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Contact saved'), gettextCatalog.getString('Your contact is safe with us!'));
        $state.go('^.list');
      }, function (err) {
        console.log(err);
      });
    };

  });
