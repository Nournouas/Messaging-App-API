const express = require("express");
const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Name required")
      .isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 cahracters")
      ,
    body("password")
    .notEmpty().withMessage("password required")
    .isLength( {min: 8}).withMessage("password must be at least 8 characters long"),
  ]
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()){
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({ path: err.path, message: err.msg }));

  return res.status(422).json({errors: extractedErrors});
};

module.exports = {
  userValidationRules,
  validate
}