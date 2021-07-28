const express = require("express");
const { isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/payment");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.param("userId", getUserById);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
