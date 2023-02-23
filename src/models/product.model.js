'user strict';
const dbConn = require('../../config/db.config');

//Product object create
const Product = function(product){
    this.name           = product.name;
    this.price          = product.price;
    this.email          = product.email;
    this.description    = product.description;
    this.photo          = product.photo;
    
};
Product.create = function (newProd, result) {    
    dbConn.query("INSERT INTO products set ?", newProd, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
//read
Product.findById = function (id, result) {
    dbConn.query("Select * from products where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
//readAll
Product.findAll = function (result) {
    dbConn.query("Select * from products", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('products : ', res);  
            result(null, res);
        }
    });   
};
Product.update = function(id, product, result){
  dbConn.query("UPDATE products SET name=?,price=?,email=?,description=?,photo=? WHERE id = ?", [product.name,product.price,product.email,product.description,product.photo, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Product.delete = function(id, result){
     dbConn.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Product;