const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup, signin, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("fname")
      .isLength({ min: 3 })
      .withMessage("must be atleast 3 chars long"),
    check("email").isEmail().normalizeEmail().withMessage("Enter email here"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("your password should have min length 8 ")
      .matches(/\d/)
      .withMessage("your password should have at least one number"),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email").isEmail().normalizeEmail().withMessage("Enter email here"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("password required here ")
      .matches(/\d/),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
