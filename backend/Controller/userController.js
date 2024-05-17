const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
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
        password: hashedPassword,
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
  if (!username || !password) {
    return res.status(422).json({
      success: false,
      error: "Please Fill email or password",
    });
  }

  await prisma.user
    .findUniqueOrThrow({
      where: {
        username: username,
      },
    })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(500).json({
          success: false,
          error: "Invalid email or password",
        });
      }
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          const { _id, name, email } = savedUser;
          res.json({
            success: true,
            token,
            savedUser,
            message: "signed in successfully",
          });
        } else {
          return res.status(522).json({
            success: false,
            error: "Invalid Email or password",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
