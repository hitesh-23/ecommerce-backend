const express = require('express');
const router = express.Router();
const {createProduct ,getSingleProduct,getAllProducts, updateProduct , deleteProduct , uploadProductImage} = require('../controllers/productController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createProduct)
  .get(authenticateUser, getAllProducts);

router
  .route("/uploadImage")
  .post(authenticateUser,authorizePermissions("admin"), uploadProductImage);

router.route("/:id")
  .get(authenticateUser, getSingleProduct)
  .patch(authenticateUser, authorizePermissions("admin"), updateProduct)
  .delete(authenticateUser, authorizePermissions("admin"), deleteProduct);

module.exports = router;