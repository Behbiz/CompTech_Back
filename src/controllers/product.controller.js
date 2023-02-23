"use strict";

const Product = require("../models/product.model");

exports.findAll = function (req, res) {
  Product.findAll(function (err, employee) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", employee);
    res.send(employee);
  });
};

exports.createMultiple = function (req, res) {
  req.body.forEach((product) => {
    const new_product = new Product({
      name: product.name,
      price: product.precio,
      description: product.description,
      email: product.email,
      photo: product.src,
    });

    //handles null error
    Product.create(new_product, function (err, product) {
      if (err) res.send(err);
    });
  });
  res.json({
    error: false,
    message: "Products added successfully!",
  });
};

exports.create = function (req, res) {
  const new_product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    email: req.body.email,
    photo: req.file
      ? req.file.destination + req.file.filename
      : req.filePath || null,
  });

  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.create(new_product, function (err, product) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Product added successfully!",
        data: product,
      });
    });
  }
};

exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.update(
      req.params.id,
      new Product(req.body),
      function (err, product) {
        if (err) res.send(err);
        res.json({ error: false, message: "Product successfully updated" });
      }
    );
  }
};

exports.delete = function (req, res) {
  Product.delete(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json({ error: false, message: "Product successfully deleted" });
  });
};
