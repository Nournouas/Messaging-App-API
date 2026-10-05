const express = require('express');
const passport = require('passport');
const { getAllUsers } = require('../controllers/messagesController');
const messagesRoute = express.Router();

/*messagesRoute.get("/protected", passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.json(req.user.id)
});*/

messagesRoute.get("/:id/users", passport.authenticate('jwt', {session: false}), getAllUsers);


module.exports = {
  messagesRoute
}