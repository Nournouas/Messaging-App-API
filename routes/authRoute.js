const express = require('express');
const { signUp, login} = require('../controllers/authController');
const passport = require('passport');
const authRouter = express.Router();
const { userValidationRules, validate } = require("../lib/validator");

authRouter.post("/signup", userValidationRules(), validate, signUp);
authRouter.post("/login", userValidationRules(), validate, login);
authRouter.get("/protected", passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.json(req.user.id)
});

authRouter.get("/protected", passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.json(req.user.id)
})

module.exports = {
  authRouter
}