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
	Nuance.create({name:'S235JR'},function(err,nuance){
		if (err) {
		  console.log('err', err);
		}
		
		Category.create({
		name: 'Tole'
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
	  
  
  
};
