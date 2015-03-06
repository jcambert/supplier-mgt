'use strict';
var app = angular.module('com.module.core');
app.run(function ($rootScope, Setting, gettextCatalog) {

  // Left Sidemenu
  $rootScope.menu = [];

  // Add Sidebar Menu
  $rootScope.addMenu = function (name, uisref, icon,adminMenu) {
    $rootScope.menu.push({
      name: name,
      sref: uisref,
      icon: icon,
	  adminMenu:adminMenu
    });
  };

  // Add Menu Dashboard
  $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home', 'fa-dashboard',true);

  // Dashboard
  $rootScope.dashboardBox = [];

  // Add Dashboard Box
  $rootScope.addDashboardBox = function (name, color, icon, quantity, href,adminBox) {
	adminBox=adminBox || false;
	var qty=0;
	var var_name=''
	if (quantity instanceof Object){
		qty=quantity.quantity;
		var_name=quantity.name;
		$rootScope[var_name]=qty;
		$rootScope.$watch(var_name,function(){
			//console.log(quantity.name + ' qty has changed');
			var dbox=_.find($rootScope.dashboardBox,function(box){ return box.var_name==var_name;});
			//console.log('before qty:'+dbox.quantity);
			dbox.quantity=$rootScope[quantity.name];
			//console.log('after qty:'+dbox.quantity);
		});
		
	}else{
		qty=quantity;
		var_name=name;
	}
	
    $rootScope.dashboardBox.push({
      name: name,
      color: color,
      icon: icon,
      quantity: qty,
	  var_name: var_name,
      href: href,
	  adminBox:adminBox
    });
	
	
  };

  // Get Settings for Database
  $rootScope.setSetting = function (key, value) {

    Setting.find({
      filter: {
        where: {
          key: key
        }
      }
    }, function (data) {

      if (data.length) {
        data[0].value = value;
        data[0].$save();
      } else {
        Setting.create({
          key: key,
          value: value
        }, function (data) {
          console.log(data);
        });
      }
      $rootScope.loadSettings();
    });
  };

  // Load Settings blank
  $rootScope.settings = {};

  // Get Settings for Loopback Service
  $rootScope.loadSettings = function () {
    Setting.find(function (settings) {
      $rootScope.settings.data = settings;
    });
  };

});

app.config(function (formlyConfigProvider) {
  var templates = 'modules/core/views/elements/fields/';
  var formly = templates + 'formly-field-';
  var fields = [
    'checkbox',
    'email',
    'hidden',
    'number',
    'password',
    'radio',
    'select',
    'text',
    'textarea'
  ];

  angular.forEach(fields, function (val) {
    formlyConfigProvider.setTemplateUrl(val, formly + val + '.html');
  });

  formlyConfigProvider.setTemplateUrl('date', templates + 'date.html');
  formlyConfigProvider.setTemplateUrl('time', templates + 'time.html');

});

app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);
