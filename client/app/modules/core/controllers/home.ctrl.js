'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
  .controller('HomeCtrl', function ($scope, $rootScope,AppAuth) {

  $scope.count = {};

  $scope.boxes =  $rootScope.dashboardBox;
  
  console.dir($scope.boxes);

});
