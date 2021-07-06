const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../../models/User");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    User.findOne({ email }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "This email address it not exist. Please try again" });
      }

      if (user.blocked === true)
        return res.status(404).json({ message: "This account has been blocked" });
  
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
          };
  
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 9000, // 15 mins in seconds
            },
            async (err, token) => {
              const loginUser = { ...user._doc };
              res.json({
                user: loginUser,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Password is incorrect! Please try again" });
        }
      });
    });
});

router.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: "User Already Exists" });
      } else {
        const newUser = new User({
            email,
            username,
            password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => res.status(400).json(err));
          });
        });
      }
    });
})


module.exports = router;
