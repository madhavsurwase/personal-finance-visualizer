import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: String,
  description: String,
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default async function handler(req, res) {
  await mongoose.connect("mongodb://localhost:27017/finance");

  if (req.method === "GET") {
    const transactions = await Transaction.find({});
    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } else if (req.method === "DELETE") {
    await Transaction.deleteOne({ _id: req.query.id });
    res.status(204).end();
  }
}
