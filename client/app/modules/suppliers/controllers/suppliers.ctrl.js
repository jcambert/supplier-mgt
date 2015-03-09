'use strict';
angular.module('com.module.suppliers')
  .controller('suppliersCtrl', function ($scope, $rootScope, $state, $stateParams, CoreService, gettextCatalog, Supplier, SuppliersService,Contact) {

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

	/*Supplier.find({filter:{include:['sectors']}},function(supplier){
		console.dir(supplier);
	});*/
   

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
		Supplier.count(function(count){
			$rootScope['suppliers_count']=count.count;
			$state.go('^.list');
		});
        
      }, function (err) {
        console.log(err);
      });
    };
	
	$scope.addcontact = function(){
		console.dir(Supplier);
		
		$scope.inserted ={supplierId:$scope.supplier.id,first_name:'first name'};
		Supplier.contacts.create($scope.inserted,function(contact){
			$scope.supplier.contacts.push(contact);
			$scope.inserted =contact;
			alert('contact id:'+ $scope.inserted.id +' inserted');
		});
		//return;
		//$scope.inserted.supplierId=$scope.supplier.id;
		
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
