// @ts-nocheck
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    body("email", "Need fix email").isEmail(),
    body("password", "Password have to 6 symbols").isLength({ min: 6 }),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Not correct files",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: "This account exist" });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });
      await user.save();
      res.status(201).json({ message: "Create user", user });
    } catch (error) {
      res.status(500).json({ message: "WRONG" });
    }
  }
);
router.post(
  "/login",
  [
    body("email", "write email right").normalizeEmail().isEmail(),
    body("password", "write password").exists(),
  ],
  async function (req, res) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email });

      if (!findUser) {
        return res.status(400).json({ message: "Account not found" });
      }
      const onMatch = await bcrypt.compare(password, findUser.password);
      if (!onMatch) {
        return res.status(400).json({ message: "you had mistake" });
      }
      const token = jwt.sign({ userId: findUser.id }, config.get("SECRET"), {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "move on", token, userId: findUser.id });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Validation not correct" });
      }
    } catch (error) {
      res.status(500).json({ message: "WRONG" });
    }
  }
);

module.exports = router;
