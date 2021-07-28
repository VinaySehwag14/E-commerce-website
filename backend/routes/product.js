const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  image,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategory,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

//* create a product
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
//* get a product
router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", image);

//*delete product
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAdmin,
  isAuthenticated,
  deleteProduct
);

//*update product
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAdmin,
  isAuthenticated,
  updateProduct
);

router.get("/products/Allproduct", getAllProducts);

router.get("/products/categories", getAllUniqueCategory);

module.exports = router;
