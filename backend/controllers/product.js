const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not Found ",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem in getting image",
      });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please provide all information in fields",
      });
    }

    let product = new Product(fields);

    if (file.image) {
      if (file.image.size > 4712399) {
        return res.status(400).json({
          error: "Image size is to large",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }

    //saving in database
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving product in database failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.image = undefined; //  product = undefined;
  return res.json(req.product);
};

exports.image = (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete product",
      });
    }
    res.json({
      message: "Deletion successfull",
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem in getting image",
      });
    }

    //updating product
    let product = req.product;
    product = _.extend(product, fields);

    if (file.image) {
      if (file.image.size > 3012340) {
        return res.status(400).json({
          error: "Image size is to large",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }

    //saving in database
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product database failed",
        });
      }
      res.json(product);
    });
  });
};

//getting all products and sorting products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found ",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let updatingStock = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(updatingStock, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
