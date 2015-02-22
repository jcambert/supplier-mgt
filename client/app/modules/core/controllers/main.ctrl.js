'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:MainCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires CoreService
 * @requires AppAuth
 * @requires User
 * @requires gettextCatalog
 **/
angular.module('com.module.core')
  .controller('MainCtrl', function ($scope, $rootScope, $state, $location, CoreService, User, gettextCatalog,AppAuth) {

	
	var rs=[];
    $scope.currentUser = User.getCurrent();
	//console.dir( $scope.currentUser );
	
	AppAuth.inRole('admin',function(res){console.dir('MainCtrl'); $rootScope.isAdmin=res;})
	
	/*$scope.currentUser.$promise.then(function(u){
		
		console.dir(u.id);
		console.dir(u);
		User.roles({'id':u.id},function(roles,resp){
			console.dir(roles[0].name);
			
		},
		function(err){ console.dir(err);}
		);
	});*/
	/*User.roles({'id':$scope.currentUser.id},function(err,roles){
		console.dir(roles);
	});*/
	
    $scope.menuoptions = $rootScope.menu;

    $scope.logout = function () {
      User.logout(function () {
          $state.go('login');
          CoreService.toastSuccess(gettextCatalog.getString('Logged out'), gettextCatalog.getString('You are logged out!'));
        }
      )
      ;
    };

  })
;
