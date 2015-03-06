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
		name:'Sous-traitant decoupe',
		description:'Decoupe'
	},
	function(err,sector){
		Supplier.create({
			name: 'H2O',
			address1: 'Technoland',
			postal_code:'25600',
			city:'Etupes',
			description:'Decoupe Jet d eau',
			keywords:'decoupe jet eau'
		  },
		  function(err,supplier){
		   //console.dir(supplier);
			supplier.sectors.add(sector,function(err){ if(err)console.log(err);});
			supplier.contacts.create({
				first_name:'Marc',
				last_name:'Wollenschneider',
				email:'h2o@decoupe.eu',
				phone1:'09 81 47 09 41',
				phone2:'06 64 15 32 87' 
			},function(err,contact){
				//supplier.contacts.add(contact,function(err){if(err)console.log(err);});
				//console.log('contact created');
			});
		  });
  
		Supplier.create({
			name: 'Laser Evolution',
			address1: '',
			postal_code:'70250',
			city:'Hericourt',
			description:'Decoupe Laser',
			keywords:'decoupe laser'
		  },
		  function(err,supplier){
			supplier.sectors.add(sector,function(err){if(err) console.log(err);});
		  });
	});
  
   Sector.create({
		id:2,
		name:'Traitement de surface',
		description:'Surface'
	},
	function(err,sector){
		Supplier.create({
			name: 'Galvalence',
			address1: 'Za Les Fontaines',
			postal_code:'26120',
			city:'Chabeuil',
			description:'Galvanisation',
			keywords:'Galvanisation'
		  },
		  function(err,supplier){
			supplier.sectors.add(sector,function(err){if(err) console.log(err);});
		  });
  
	}); 
  
  
	  
	console.log('Population ended');
	 
  
  
};
