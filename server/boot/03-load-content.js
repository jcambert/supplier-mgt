'use strict';
var _= require('lodash');
module.exports = function (app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  console.log('Creating categories and products');

  var Category = app.models.Category;
  var Product = app.models.Product;
  var Nuance = app.models.Nuance;

  
  
  function populate(category,nuancepop){
	console.log('Populate nuance:'+nuancepop.name);
	Nuance.create({name:nuancepop.name},function(err,nuance){
		if (err) {
		  console.log('err', err);
		}
		console.log('create nuance:'+nuance.name);
		//console.dir(nuancepop);
		_.forEach(nuancepop.population,function(t){
			console.log('create '+nuance.name +' ep: ' +t.e);
				Product.create({
				  name: nuance.name +' ep: ' +t.e,
				  prix: t.p,
				  epaisseur: t.e,
				  categoryId: category.id,
				  nuanceId: nuance.id
				}, function (err, data) {
				  //console.log (data);
				});
			});
	});
  
  }
  
  
  Category.create({
	id:1,
	name: 'Tole',
	report_title:'CONDITIONS ACHATS MATIERES PREMIERES SUR STOCK chez ALACIER (Salzgitter)',
	description:'Prix Achats en €/t des Toles pour Coupage Laser Long 3000 à 6000*larg 1500',
	  }, function (err, category) {
		if (err) {
		  console.log('err', err);
		}
		
		var n=[];
		n.push({name:'S235JR',population:[{e:3,p:500},{e:4,p:500},{e:5,p:500},{e:6,p:500},{e:8,p:500},{e:10,p:500},{e:12,p:510},{e:15,p:510}]});
		n.push({name:'S235JR-DKP',population:[{e:3,p:530},{e:4,p:530},{e:5,p:530},{e:6,p:530},{e:8,p:542},{e:10,p:542},{e:12,p:560}]})	;
		n.push({name:'S355MC',population:[{e:3,p:535},{e:4,p:535},{e:5,p:535},{e:6,p:535},{e:8,p:535},{e:10,p:535},{e:12,p:545},{e:15,p:555},{e:20,p:630}]});
		n.push({name:'S355MC-DKP',population:[{e:3,p:563},{e:4,p:563},{e:5,p:563},{e:6,p:563},{e:8,p:575},{e:10,p:575},{e:12,p:595}]});	
		n.push({name:'S355J2+N',population:[{e:3,p:545},{e:4,p:545},{e:5,p:545},{e:6,p:545},{e:8,p:545},{e:10,p:555},{e:12,p:555},{e:15,p:555}]});
		n.push({name:'S500MC',population:[{e:3,p:570},{e:4,p:570},{e:5,p:570},{e:6,p:570},{e:8,p:570},{e:10,p:570},{e:12,p:580},{e:15,p:580}]});
		n.push({name:'S700MC',population:[{e:3,p:750},{e:4,p:750},{e:5,p:750},{e:6,p:750},{e:8,p:760},{e:10,p:760},{e:12,p:770},{e:15,p:780}]});
		n.push({name:'HB400',population:[{e:3,p:1210},{e:4,p:1210},{e:5,p:1030},{e:6,p:1030},{e:8,p:1030},{e:10,p:1030},{e:12,p:1030}]});
		n.push({name:'HB500',population:[{e:5,p:1270}]});
		_.forEach(n,function(p){
			populate(category,p);
		});
		
	  });
	 
	Category.create({
	id:2,
	name: 'Tole',
	report_title:'CONDITIONS ACHATS MATIERES PREMIERES SUR STOCK chez ALACIER (Salzgitter)',
	description:'Prix Achats en €/t des Toles pour Coupage Laser Long 4000 à12000*larg 2000',
	  }, function (err, category) {
		if (err) {
		  console.log('err', err);
		}
		
		var n=[];
		n.push({name:'S235JR',population:[{e:3,p:500},{e:4,p:500},{e:5,p:500},{e:6,p:500},{e:8,p:500},{e:10,p:500},{e:12,p:510},{e:15,p:510}]});
		n.push({name:'S235JR-DKP',population:[{e:3,p:530},{e:4,p:530},{e:5,p:530},{e:6,p:530},{e:8,p:530},{e:10,p:530},{e:12,p:550}]})	;
		n.push({name:'S355MC',population:[{e:3,p:535},{e:4,p:535},{e:5,p:535},{e:6,p:535},{e:8,p:535},{e:10,p:535},{e:12,p:545},{e:15,p:555},{e:20,p:630}]});
		n.push({name:'S355MC-DKP',population:[{e:3,p:575},{e:4,p:575},{e:5,p:575},{e:6,p:575},{e:8,p:575},{e:10,p:575},{e:12,p:595}]});	
		n.push({name:'S355J2+N',population:[{e:3,p:545},{e:4,p:545},{e:5,p:545},{e:6,p:545},{e:8,p:545},{e:10,p:545},{e:12,p:555},{e:15,p:555}]});
		n.push({name:'S500MC',population:[{e:3,p:570},{e:4,p:570},{e:5,p:570},{e:6,p:570},{e:8,p:570},{e:10,p:570},{e:12,p:580},{e:15,p:590}]});
		n.push({name:'S700MC',population:[{e:3,p:750},{e:4,p:750},{e:5,p:750},{e:6,p:750},{e:8,p:760},{e:10,p:760},{e:12,p:770},{e:15,p:780}]});
		
		_.forEach(n,function(p){
			populate(category,p);
		});
		
	  });
	  
	Category.create({
	id:3,
	name: 'Plaque',
	report_title:'',
	description:'Prix Achats en € /t des Plaques pour Coupage Oxy/Plasma Long 6000 à 12000*larg 2000 à 2500',
	  }, function (err, category) {
		if (err) {
		  console.log('err', err);
		}
		
		var n=[];
		n.push({name:'S235JR',population:[{e:10,p:540},{e:12,p:540},{e:15,p:540},{e:18,p:540},{e:20,p:540},{e:25,p:540},{e:30,p:540},{e:35,p:540},{e:40,p:540},{e:45,p:540},{e:50,p:540},{e:55,p:540},{e:60,p:540},{e:70,p:580},{e:80,p:580},{e:90,p:610},{e:100,p:610},{e:110,p:610},{e:120,p:610}]});
		n.push({name:'S355J2+N',population:[{e:10,p:565},{e:12,p:565},{e:15,p:565},{e:18,p:565},{e:20,p:565},{e:25,p:565},{e:30,p:565},{e:35,p:565},{e:40,p:565},{e:45,p:565},{e:50,p:565},{e:55,p:565},{e:60,p:565},{e:70,p:615},{e:80,p:615},{e:90,p:645},{e:100,p:645},{e:110,p:645},{e:120,p:645}]});
		n.push({name:'P265GH/P275NL1',population:[{e:10,p:585},{e:12,p:585},{e:15,p:585},{e:18,p:585},{e:20,p:585},{e:25,p:585},{e:30,p:615},{e:35,p:615},{e:40,p:615},{e:45,p:615},{e:50,p:615},{e:55,p:615},{e:60,p:615},{e:70,p:635},{e:80,p:635},{e:90,p:665},{e:100,p:665},{e:110,p:665},{e:120,p:665}]});
		n.push({name:'P355GH/P355NL1',population:[{e:10,p:605},{e:12,p:605},{e:15,p:605},{e:18,p:605},{e:20,p:605},{e:25,p:605},{e:30,p:635},{e:35,p:635},{e:40,p:635},{e:45,p:635},{e:50,p:635},{e:55,p:635},{e:60,p:635},{e:70,p:655},{e:80,p:655},{e:90,p:685},{e:100,p:685},{e:110,p:685},{e:120,p:685}]});
		n.push({name:'S500MC',population:[{e:10,p:800},{e:12,p:800},{e:15,p:800},{e:18,p:800},{e:20,p:800},{e:25,p:800}]});
		n.push({name:'S690QL',population:[{e:4,p:1680},{e:5,p:1490},{e:6,p:1130},{e:8,p:1050},{e:10,p:1015},{e:12,p:1015},{e:15,p:1015},{e:20,p:1015},{e:25,p:1015},{e:30,p:1015},{e:35,p:1015},{e:40,p:1015},{e:45,p:1015},{e:50,p:1015},{e:55,p:1015},{e:60,p:1015},{e:70,p:1190},{e:80,p:1190},{e:90,p:1270},{e:100,p:1270},{e:110,p:1350},{e:120,p:1350},{e:130,p:1470},{e:140,p:1470},{e:150,p:1470},{e:160,p:2070},{e:170,p:2070},{e:180,p:2070},{e:190,p:2070},{e:200,p:2070}]});
		n.push({name:'HB400',population:[{e:4,p:1580},{e:5,p:1480},{e:6,p:1110},{e:8,p:1040},{e:10,p:1030},{e:12,p:1030},{e:15,p:1030},{e:20,p:1030},{e:25,p:1030},{e:30,p:1030},{e:35,p:1030},{e:40,p:1030},{e:45,p:1080},{e:50,p:1080},{e:55,p:1080},{e:60,p:1080},{e:70,p:1180},{e:80,p:1180}]});
		n.push({name:'HB500',population:[{e:6,p:1350},{e:8,p:1210},{e:10,p:1210},{e:12,p:1210},{e:15,p:1210},{e:20,p:1210},{e:25,p:1210},{e:30,p:1210},{e:35,p:1210},{e:40,p:1210}]});
		_.forEach(n,function(p){
			populate(category,p);
		});
		
	  });
	  
	  console.log('Population ended');
	  /*
	Nuance.create({name:'S355J2+N'},function(err,nuance){});
	Nuance.create({name:'S355MC'},function(err,nuance){});
	Nuance.create({name:'S235JR'},function(err,nuance){
		if (err) {
		  console.log('err', err);
		}
		
		var tmp=[{e:3,p:500},{e:4,p:500},{e:5,p:500},{e:6,p:500},{e:8,p:500},{e:10,p:500},{e:12,p:510},{e:15,p:510}]
		Category.create({
		id:1,
		name: 'Tole',
		report_title:'CONDITIONS ACHATS MATIERES PREMIERES SUR STOCK chez ALACIER (Salzgitter)',
		description:'Prix Achats en €/t des Toles pour Coupage Laser Long 3000 à 6000*larg 1500',
		  }, function (err, category) {
			if (err) {
			  console.log('err', err);
			}
			_.forEach(tmp,function(t){
				Product.create({
				  name: nuance.name +' ep: ' +t.e,
				  prix: t.p,
				  epaisseur: t.e,
				  categoryId: category.id,
				  nuanceId: nuance.id
				}, function (err, data) {
				  //console.log (data);
				});
			});
			
		  });
	  
	});
	  
	  
	  Category.create({
		id:2,
		name: 'Tole',
		report_title:'CONDITIONS ACHATS MATIERES PREMIERES SUR STOCK chez ALACIER (Salzgitter)',
		description:'Prix Achats en €/t des Toles pour Coupage Laser Long 4000 à12000*larg 2000',
		  }, function (err, category) {
			if (err) {
			  console.log('err', err);
			}
			Product.create({
			  name: 'S355J2+N ep: 3' ,
			  prix: '500',
			  epaisseur: '3',
			  categoryId: category.id,
			  nuanceId: 1
			}, function (err, data) {
			  //console.log (data);
			});
			Product.create({
			  name:  'S355J2+N ep: 12' ,
			  prix: '510',
			  epaisseur: '12',
			  categoryId: category.id,
			  nuanceId:1
			}, function (err, data) {
			  //console.log (data);
			});
		  });
  
	 Category.create({
		id:3,
		name: 'Plaque',
		report_title:'',
		description:'Prix Achats en € /t des Plaques pour Coupage Oxy/Plasma Long 6000 à 12000*larg 2000 à 2500',
		  }, function (err, category) {
			if (err) {
			  console.log('err', err);
			}
			Product.create({
			  name: 'S235JR ep: 10' ,
			  prix: '540',
			  epaisseur: '10',
			  categoryId: category.id,
			  nuanceId: 3
			}, function (err, data) {
			  //console.log (data);
			});
			Product.create({
			  name:  'S235JR ep: 90' ,
			  prix: '610',
			  epaisseur: '90',
			  categoryId: category.id,
			  nuanceId:1
			}, function (err, data) {
			  //console.log (data);
			});
		  });*/
  
  
};
