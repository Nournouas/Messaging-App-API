const { getUsers } = require("../lib/queries");
require('dotenv').config();

const getAllUsers = async (req, res) => {
  const id = req.params.id
  try{
    const users = await getUsers(id);
    res.json(users)
  }catch(err){
    console.error(err)
    res.json({
      status: false,
      message: "server error, try again"
    })
  }
}

module.exports = {
  getAllUsers,
}