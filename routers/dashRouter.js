const router = require("express").Router();
const auth = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");
const { param } = require("express-validator");
const Dashboard = require("../models/dashModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    if (!req.auth) return res.json(false);
    const decodedUser = req.auth;
    const user = await User.findById(decodedUser.user);
    res.send({ ...user.toObject(), passwordHash: undefined });

    const { deposit, profit, packages, bonus, withdraw } = req.body;
    const newDashboard = new Dashboard({
      userId: user._id,
      email: user.email,
      deposit,
      profit,
      packages,
      bonus,
      withdraw,
    });

    const savedDashboard = await newDashboard.save();
    res.json(savedDashboard);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tr = await Dashboard.findById(req.params.id);
    await tr.updateOne({ $set: req.body });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/", async (req, res) => {
  try {
    const dash = await Dashboard.find();
    res.json(dash);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.get("/user", async (req, res) => {
  try {
    // const token = req.cookies.token;
    // if (!token) return res.json(false);
    if (!req.auth) return res.json(false);
    //jwt.verify(token, process.env.JWT_SECRET);
    const decodedUser = req.auth;
    const user = await User.findById(decodedUser.user);
    const dashs = await Dashboard.find({ userId: user._id });
    res.json(dashs);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Please enter a valid Transaction ID"),
  validateRequest,
  async (req, res) => {
    try {
      const post = await Dashboard.findById(req.params.id);

      if (!post) return res.status(404).json("Transaction not found");

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
