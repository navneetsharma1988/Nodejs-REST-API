const createError = require("http-errors");
const mongoose = require("mongoose");

const Product = require("../Models/Product.model");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const results = await Product.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

  },

  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Product does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product id"));
        return;
      }
      next(error);
    }
  },

  updateAProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Product Id"));
      }

      next(error);
    }
  },

  deleteAProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Product does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product id"));
        return;
      }
      next(error);
    }
  },

  seedInitialData: async () => {
    try {
      const results = await Product.find({}, { __v: 0 });
      if (results.length === 0) {
        const products = [
          {
            name: "iPhone 14 Pro Max",
            price: 6500,
          },
          {
            name: "MacBook Air Pro",
            price: 10000,
          },
          {
            name: "AirPods Pro",
            price: 2500,
          },
          {
            name: "Apple Watch Series 7",
            price: 5000,
          },
          {
            name: "iPad Pro",
            price: 6000,
          },
        ];
        products.forEach(async (product) => {
          const newProduct = new Product(product);
          await newProduct.save();
        });
      }
      console.log("Initial Products Data has been populated");
    } catch (error) {
      console.log(error.message);
    }
  },
};
