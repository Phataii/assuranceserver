const router = require("express").Router();
const auth = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");
const { param } = require("express-validator");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    if (!req.auth) return res.json(false);
    const decodedUser = req.auth;
    const user = await User.findById(decodedUser.user);

    const { amount, crypto, status, bank, date, walletAddress, type } =
      req.body;

    const newTransaction = new Transaction({
      userId: user._id,
      email: user.email,
      amount,
      crypto,
      bank,
      date,
      status,
      walletAddress,
      type,
    });

    const savedTransaction = await newTransaction.save();

    res.json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tr = await Transaction.findById(req.params.id);
    await tr.updateOne({ $set: req.body });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/user", async (req, res) => {
  try {
    if (!req.auth) return res.json(false);
    const decodedUser = req.auth;
    const user = await User.findById(decodedUser.user);
    const transactions = await Transaction.find({ userId: user._id });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//Get a Transaction
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Please enter a valid Transaction ID"),
  validateRequest,
  async (req, res) => {
    try {
      const post = await Transaction.findById(req.params.id);

      if (!post) return res.status(404).json("Transaction not found");

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
