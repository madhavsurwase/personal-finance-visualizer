import { useState } from "react";

const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !description) return alert("All fields are required");

    onAdd({ amount, description, date, category });
    setAmount("");
    setDescription("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded mb-2">
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Transaction</button>
    </form>
  );
}
