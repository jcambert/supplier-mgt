'use strict';

module.exports = function (app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  console.log('Creating categories and products');

  var Category = app.models.Category;
  var Product = app.models.Product;
  var Nuance = app.models.Nuance;
/*
  Category.create({
    name: 'Beer'
  }, function (err, category) {
    if (err) {
      console.log('err', err);
    }
    Product.create({
      name: 'Draft beer',
      price: '250',
      percentage: '5',
      categoryId: category.id
    }, function (err, data) {
      //console.log (data);
    });
    Product.create({
      name: 'Bottled beer',
      price: '350',
      percentage: '5',
      categoryId: category.id
    }, function (err, data) {
      //console.log (data);
    });
  });

  Category.create({
    name: 'Wine'
  }, function (err, category) {
    if (err) {
      console.log('err', err);
    }
    Product.create({
      name: 'Red wine',
      price: '350',
      percentage: '12',
      categoryId: category.id
    }, function (err, data) {
      //console.log (data);
    });
    Product.create({
      name: 'White wine',
      price: '350',
      percentage: '12',
      categoryId: category.id
    }, function (err, data) {
      //console.log (data);
    });
  });
*/
	Nuance.create({name:'S355J2+N'},function(err,nuance){});
	Nuance.create({name:'S355MC'},function(err,nuance){});
	Nuance.create({name:'S235JR'},function(err,nuance){
		if (err) {
		  console.log('err', err);
		}
		
		Category.create({
		id:1,
		name: 'Tole',
		description:'Prix Achats en €/t des Toles pour Coupage Laser Long 3000 à 6000*larg 1500',
		  }, function (err, category) {
			if (err) {
			  console.log('err', err);
			}
			Product.create({
			  name: nuance.name +' ep: 3' ,
			  prix: '500',
			  epaisseur: '3',
			  categoryId: category.id,
			  nuanceId: nuance.id
			}, function (err, data) {
			  //console.log (data);
			});
			Product.create({
			  name:  nuance.name +' ep: 12' ,
			  prix: '510',
			  epaisseur: '12',
			  categoryId: category.id,
			  nuanceId: nuance.id
			}, function (err, data) {
			  //console.log (data);
			});
		  });
	  
	});
	  
	  
	  Category.create({
		id:2,
		name: 'Tole',
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
		  });
  
  
};
