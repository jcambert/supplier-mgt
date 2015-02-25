'use strict';
angular.module('com.module.products')
  .controller('ProductsCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Product, Category,Nuance) {

    var productId = $stateParams.id;
    var categoryId = $stateParams.categoryId;

    if (productId) {
      $scope.product = Product.findById({
        id: productId
      }, function (product) {
        product.category = Product.category({id: product.id});
		//product.nuance= Product.nuance({id:product.id});
      }, function (err) {
        console.log(err);
      });
    } else {
      $scope.product = {};
    }

    if (categoryId) {
      $scope.product.categoryId = categoryId;
    }

    function loadItems() {
      $scope.categories = [];
      Category.find({order:'id'}, function (categories) {
        angular.forEach(categories, function (category) {
          category.products = Category.products({id: category.id});
          this.push(category);
        }, $scope.categories);
      });
    }

    loadItems();

    $scope.delete = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Deleting this cannot be undone'), function () {
        Product.deleteById(id, function () {
          CoreService.toastSuccess(gettextCatalog.getString('Product deleted'), gettextCatalog.getString('Your product is deleted!'));
          loadItems();
          $state.go('app.products.list');
        }, function (err) {
          CoreService.toastError(gettextCatalog.getString('Error deleting product'), gettextCatalog.getString('Your product is not deleted: ') + err);
        });
      }, function () {
        return false;
      });
    };

    $scope.deletecategory = function (id) {


      Category.deleteById(id, function () {
        CoreService.toastSuccess(gettextCatalog.getString('Category deleted'), gettextCatalog.getString('Your category is deleted!'));
        loadItems();
      }, function (err) {
        CoreService.toastError(gettextCatalog.getString('Error deleting category'), gettextCatalog.getString('Your category is not deleted: ') + err);
      });


    };

	var formFields=[];
	formFields.push([]);
	
	var formFields_tole=
	
		[
      {
        key: 'name',
        type: 'hidden',
        label: gettextCatalog.getString('Name'),
        //required: true
      },
      {
        key: 'categoryId',
        type: 'hide',
        label: gettextCatalog.getString('Category'),
        required: true
      },
      
      {
        key: 'prix',
        type: 'text',
        label: gettextCatalog.getString('Price')
      },
	  {
        key: 'nuanceId',
        type: 'select',
        label: gettextCatalog.getString('Nuance'),
		options: []
      },
	  {
        key: 'epaisseur',
        type: 'text',
        label: gettextCatalog.getString('Thickness')
      },
    ]
	formFields.push(formFields_tole);
	formFields.push(formFields_tole);
	
	$scope.formFields =formFields[$stateParams.categoryId];
	
	if($stateParams.categoryId==1 || $stateParams.categoryId==2){
		console.dir($scope.product);
		Nuance.find({},function(nuances){
			var idx=-1;
			idx=_.findLastIndex(formFields[1],function(c){ return c.key=='nuanceId';});
			console.log('options:'+idx);
			_.map(nuances,function(nuance){
				formFields[1][idx].options.push({"value":nuance.id,"name":nuance.name});
			});
			console.dir(formFields[1][idx].options);
		});
		
	}
	
	Product.beforeSave = function(next, modelInstance) {
		console.log('Product.beforeSave ');
		modelInstance.name=modelInstance.nuance +' ep: ' + modelInstance.epaisseur ;
		next();
	};
    

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function () {
	console.dir($scope.product);
		Nuance.findById({id:$scope.product.nuanceId},function(nuance){
			$scope.product.name=nuance.name+ ' ep: '+$scope.product.epaisseur;
			  Product.upsert($scope.product, function () {
				CoreService.toastSuccess(gettextCatalog.getString('Product saved'), gettextCatalog.getString('Your product is safe with us!'));
				$state.go('^.list');
			  }, function (err) {
				console.log(err);
			  });
		});
	  
    };

  })
  //Cars.find({ where: {carClass:'fullsize'} });
  //include:{'category','nuance'},where:{categoryId:$stateParams.categoryId},
  .controller('ReportProductsCtrl', function ($scope, $state, $stateParams, CoreService, gettextCatalog, Product, Category,Nuance) {
	function loadItems(){
		console.dir('Report Category id:'+$stateParams.categoryId);
		Product.find({filter:{where:{categoryId:$stateParams.categoryId},order:['nuanceId','epaisseur' ],include: ['category', 'nuance']}},function(products){
			var report=[];
			console.dir(products);
			var nuancesId=_.pluck(products,'nuanceId');
			var epaisseurs=_.pluck(products,'epaisseur');
			angular.forEach(nuancesId,function(nuanceId){
				var product_matches=_.find(products,function(product){return product.nuanceId=nuanceId});
				
			});
		});
	};
	
	loadItems();
	
	
  })
  ;
