const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const path = require("path");

// Set up Multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Retrieve all products
router.get("/", productController.findAll);

// Create a new product
router.post("/", upload.single("photo"), productController.create);

router.post("/multiple", productController.createMultiple)

// Retrieve a single product with id
router.get("/:id", productController.findById);

// Update a product with id
router.put("/:id", productController.update);

// Delete a product with id
router.delete("/:id", productController.delete);

module.exports = router;
