const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    console.log("Received user data:", req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return res.status(500).json({ message: "Error generating salt" });
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }

        User.create({
          username: username,
          email: email,
          password: hash,
        })
          .then((newUser) => {
            const token = jwt.sign({ userId: newUser.id }, authConfig.secret, {
              expiresIn: "2h",
            });

            res.status(201).json({
              message: "Created new user",
              newUser: newUser,
              accessToken: token,
            });

            console.log(
              `[Server]: ${newUser.firstName} (${newUser.lastName}) signed up`,
            );
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Error creating user", error: err.message });
          });

        User.create({
          username: username,
          email: email,
          password: hash,
        })
          .then((newUser) => {
            const token = jwt.sign({ userId: newUser.id }, authConfig.secret, {
              expiresIn: "2h",
            });

            res.status(201).json({
              message: "Created new user",
              newUser: newUser,
              accessToken: token,
            });

            console.log(
              `[Server]: ${newUser.firstName} (${newUser.lastName}) signed up`,
            );
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Error creating user", error: err.message });
          });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (req.body.email == null || req.body.password == null) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    User.findOne({ where: { email: req.body.email } }).then((newUser) => {
      if (!newUser) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const storedHashedPassword = newUser.password;
      const userInputPassword = req.body.password;

      bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          return;
        }

        const token = jwt.sign(
          { userId: newUser.id },
          authConfig.secret,

          { expiresIn: "2h" },
        );

        console.log("login user token", newUser.id);

        if (result) {
          console.log(
            `[Server]: ${newUser.firstName} (${newUser.lastName}) logged in`,
          );
          return res.json({
            user: newUser,
            accessToken: token,
          });
        } else {
          console.log("[Server]: Passwords do not match! Auth failed.");
          res.status(401).send("Invalid credentials");
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
