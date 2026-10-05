const bcrypt = require("bcrypt");
const { createUser, getUser } = require("../lib/queries");
require('dotenv').config()
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try{
    let { name, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await createUser(name, hashedPassword);
    res.json({
      signupPass: true,
    });
  }catch(err){
    res.json({
      signupPass: false,
      sqlError: err,
    });
  }
}

const login = async (req, res) => {
  try{
    let { name, password } = req.body;
    const existingUser = await getUser(name);
    if (existingUser){
      const passMatch = await bcrypt.compare(password, existingUser.password);
      if (passMatch){
        const opts = {}
        opts.expiresIn = 3600 * 2;
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ name }, secret, opts)
        return res.json({
          authPass: true,
          token
        });
      };
    }
    return res.status(401).json({ authPass: false });
  }catch(err){
    console.error(err);
    res.json({
      authPass: false,
      sqlError: err,
    })
  };
}

module.exports = {
  signUp,
  login
}