const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const [existingUser] = await User.findByEmail(email);
  if (existingUser.length > 0) {
    res.status(400).json({
      error: "email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = new User(username, email, hashedPassword);
  await createUser.save();
  res.status(201).json({
    message: "User created",
    user: createUser,
  });
};

const allUsers = (req, res, next) => {
  User.fetchAll().then(([result]) => {
    res.status(200).json({
      message: "all users",
      result: result,
    });
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [existingUser] = await User.findByEmail(email);
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = existingUser[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const tokenPayload = { email: existingUser[0].email };
    const accessToken = jwt.sign(tokenPayload, "SECRET", { expiresIn: "2h" });

    res
      .status(200)
      .json({
        status: "success",
        message: "User logged in",
        data: { accessToken },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { userLogin, userRegister, allUsers };
