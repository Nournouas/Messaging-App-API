const { prisma } = require("./prisma");

const createUser = async (name, password) => {
  const user = await prisma.user.create({
    data: {
      name,
      password
    }
  });
}

const getUser = async (name) => {
  const user = await prisma.user.findUnique({
    where: { name },
  });
  return user;
}

const getUsers = async (id) => {
  const intId = parseInt(id);
  const users = await prisma.user.findMany({
    where: {
      NOT: { id: intId },
    },
    omit: {
      password: true
    }
  });
  return users;
}


module.exports = {
  createUser,
  getUser,
  getUsers
}