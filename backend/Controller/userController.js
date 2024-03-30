const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    const searchUser = await prisma.user.findMany({
      where: {
        username: username,
      },
    });
    if (searchUser.length > 0) {
      return res.status(400).send("Username already exists");
    }
    await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: password,
      },
    });
    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Signup endpoint
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const getUser = await prisma.user.findMany({
    where: {
      username: username,
      password: password,
    },
  });
  if (getUser.length === 0) {
    res.status(401).json({
      success: false,
      message: "User not exists or incorrect username or password",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Login successfully",
    });
  }
};
