const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// new use registration
router.post("/register", async (req, res) => {
  try {
    // check if user already exists

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // return res.send({
      //   success: false,
      //   message: "User already exists",
      // });
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //  new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // return res.send({
      //     success: false,
      //     message: "Invalid email! Please try with correct email address"
      // })
      throw new Error("User not found! Try with different email");
    }
    // comparing passoword
    const plainPassword = req.body.password;
    const encryptedPassword = user.password;
    const validPassword = await bcrypt.compare(
      plainPassword,
      encryptedPassword
    );

    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    //create and assign token ( encrypt the user id -> in the form of token -> send it to the front end as the login response)
    // once logged in, there is a need of token to perform other api requests from front end
    const token = jwt.sign({_userId: user._id}, process.env.jwt_secret);
    
    // send response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get curent user
// sm To get the userId, must call the authMiddleware.js
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    // console.log(user);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

// get all registered users 
router.get("/get-all-registered-users", authMiddleware, async(req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})
module.exports = router;