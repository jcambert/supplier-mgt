'use strict';
angular.module('com.module.suppliers',['com.module.contacts'])
  .controller('suppliersCtrl', function ($scope, $rootScope, $state, $stateParams, CoreService, gettextCatalog, Supplier, SuppliersService,Contact, ContactsService) {

    var supplierId = $stateParams.id;

	if (supplierId) {
      $scope.supplier = Supplier.findOne({filter:{where:{id:supplierId},include:['sectors','contacts']}},{
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
	    Supplier.count(function(count){
			$rootScope['suppliers_count']=count.count;
			$state.reload();
		});
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

    $scope.onSubmit = function (continu) {
      Supplier.upsert($scope.supplier, function (supplier) {
	  
        CoreService.toastSuccess(gettextCatalog.getString('Supplier saved'), gettextCatalog.getString('Your supplier is safe with us!'));
		Supplier.count(function(count){
			$rootScope['suppliers_count']=count.count;
			continu?$state.go('^.edit',{id:supplier.id}):$state.go('^.list');
		});
        
      }, function (err) {
        console.log(err);
      });
    };
	
	$scope.deleteContact = function(contactId){
		ContactsService.deleteContact(contactId.id,function(){
			_.remove($scope.supplier.contacts,function(contact){return contact.id==contactId.id;});
			Contact.count(function(count){
				$rootScope['contacts_count']=count.count;
			});});
	};
	
	$scope.addBlanckContact = function(){
		ContactsService.addBlanckContact($scope.supplier.id, function(contact){
			$scope.supplier.contacts.push(contact);
			$scope.inserted =contact;
			//console.dir('Inserted id:'+contact.id);
			Contact.count(function(count){
				$rootScope['contacts_count']=count.count;
			});
		});
		
		
		
	};
	
	$scope.savecontact=function(data,id){
		//console.dir(data);
		//console.dir(id);
		var idx= _.findIndex($scope.supplier.contacts,function(c){return c.id==id;});
		angular.extend($scope.supplier.contacts[idx], data);
		//console.dir($scope.supplier.contacts[idx]);
		
		Contact.upsert($scope.supplier.contacts[idx],function(){
			CoreService.toastSuccess(gettextCatalog.getString('Contact saved'), gettextCatalog.getString('Your contact is safe with us!'));
			
		},function(err){
			CoreService.toastError(gettextCatalog.getString('Error'),err);
		});
		
	};

  });
