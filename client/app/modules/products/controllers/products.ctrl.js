'use strict';
angular.module('com.module.products')
  .controller('ProductsCtrl', function ($scope, $rootScope, $state, $stateParams, CoreService, gettextCatalog, Product, Category,Nuance) {

	var today = new Date();
	var closeday=addDays(today,-15);
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

	$scope.overdate = function(date_validity){
		//console.log('Date de validite:'+date_validity);
		//console.log(new Date(date_validity)>new Date());
		return new Date(date_validity)<today;
	};
	
	$scope.closedate = function(date_validity){
		//console.log('Date de validite:'+date_validity);
		//console.log(new Date(date_validity)>new Date());
		return new Date(date_validity)<closeday;
	};
	
	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(date.getDate() + days);
		return result;
	}
	
    function loadItems() {
      $scope.categories = [];
      Category.find({filter:{where:{'status':1},order:'id'}}, function (categories) {
        angular.forEach(categories, function (category) {
          category.products = Category.products({id: category.id});
          this.push(category);
        }, $scope.categories);
		$rootScope['categories_count']=categories.length;
      });
    }

    loadItems();

    $scope.delete = function (id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'), gettextCatalog.getString('Deleting this cannot be undone'), function () {
        Product.deleteById(id, function () {
          CoreService.toastSuccess(gettextCatalog.getString('Product deleted'), gettextCatalog.getString('Your product is deleted!'));
		  Product.count(function(count){
			loadItems();
			$rootScope['products_count']=count.count;
			$state.go('app.products.list');
		  });
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
	formFields.push(formFields_tole);
	
	$scope.formFields =formFields[$stateParams.categoryId];
	
	if($stateParams.categoryId==1 || $stateParams.categoryId==2 || $stateParams.categoryId==3){
		console.dir($scope.product);
		Nuance.find({},function(nuances){
			var idx=-1;
			idx=_.findLastIndex(formFields[1],function(c){ return c.key=='nuanceId';});
			//console.log('options:'+idx);
			_.map(nuances,function(nuance){
				formFields[1][idx].options.push({"value":nuance.id,"name":nuance.name});
			});
			//console.dir(formFields[1][idx].options);
		});
		
	}
	
	/*Product.beforeSave = function(next, modelInstance) {
		console.log('Product.beforeSave ');
		modelInstance.name=modelInstance.nuance +' ep: ' + modelInstance.epaisseur ;
		next();
	};*/
    

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function () {
		//console.dir($scope.product);
		Nuance.findById({id:$scope.product.nuanceId},function(nuance){
			$scope.product.name=nuance.name+ ' ep: '+$scope.product.epaisseur;
			  Product.upsert($scope.product, function () {
				CoreService.toastSuccess(gettextCatalog.getString('Product saved'), gettextCatalog.getString('Your product is safe with us!'));
				Product.count(function(count){
					$rootScope['products_count']=count.count;
					$state.go('^.list');
				});
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
		
		Nuance.find({filter:{order:'name'}},function(nuances){
			Product.find({filter:{where:{categoryId:$stateParams.categoryId},order:['nuance.name'],include: ['category', 'nuance']}},function(products){
				var headers=[];headers.push('');
				var report=[];
				var tmp={};
				console.dir(products);
				var nuancesId=_.uniq(_.pluck(products,'nuanceId'),function(n){return n;});
				console.log('liste des nuances');
				console.dir(nuancesId);
				var epaisseurs=_.uniq(_.pluck(products,'epaisseur'),function(e){return e;});
				var i,j;
				i=0;j=0;
				
				if(products.length){
					$scope.category=products[0].category;
				}
				
				angular.forEach(nuancesId,function(nuanceId){
					var nuance=_.find(nuances,function(nuance){return nuance.id==nuanceId;});
					headers.push(nuance.name);
					
				});
				angular.forEach(epaisseurs,function(epaisseur){
					tmp={epaisseur:epaisseur,prix:new Array(headers.length-1)};
					angular.forEach(nuancesId,function(nuanceId){
						var nuance=_.find(nuances,function(nuance){return nuance.id==nuanceId;});
						var p_matches=_.filter(products,function(product){return product.nuanceId==nuanceId && product.epaisseur==epaisseur;});
						
						if(p_matches.length){
							angular.forEach(p_matches,function(p){
								tmp.prix[headers.indexOf(p.nuance.name)-1]={id:p.id,categoryId:p.categoryId,prix:p.prix,sale_coeficient:p.category.sale_coeficient};
							});
							
						}
						
					});
					report.push(tmp);
				
				});
				
				console.log('Report');
				console.dir(report);
				console.log('header');
				console.dir(headers);
				
				$scope.headers=headers;
				$scope.reports=_.sortBy(report,'epaisseur');
			});
		});
	};
	
	loadItems();
	
	
  })
  ;
