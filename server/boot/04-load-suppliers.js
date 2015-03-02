'use strict';
var _= require('lodash');
module.exports = function (app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  console.log('Creating Suppliers');

  var Contact = app.models.Contact;
  var Supplier = app.models.Supplier;
  var Sector = app.models.Sector;

  
  Sector.create({
		id:1,
		description:'Sous-traitant decoupe'
	},
	function(err,sector){
		Supplier.create({
			name: 'H2O',
			address1: 'Technoland',
			postal_code:'25600',
			city:'Etupes',
			description:'Decoupe Jet d eau',
			keywords:'decoupe jet eau',
			sectors:[sector.id]
		  },
		  function(err,supplier){
			
		  });
  
	});
  
   Sector.create({
		id:2,
		description:'Traitement de surface'
	},
	function(err,sector){
		Supplier.create({
			name: 'Galvalence',
			address1: 'Za Les Fontaines',
			postal_code:'26120',
			city:'Chabeuil',
			description:'Galvanisation',
			keywords:'Galvanisation',
			sectors:[sector.id]
		  },
		  function(err,supplier){
			
		  });
  
	}); 
  
  
	  
	console.log('Population ended');
	 
  
  
};
