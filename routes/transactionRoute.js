const express = require("express");
const {
  addTransaction,
  getTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add-transaction", addTransaction);
router.put("/edit-transaction", editTransaction);
router.post("/get-transaction", getTransaction);
router.post("/delete-transaction", deleteTransaction);

module.exports = router;
