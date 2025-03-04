import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PersonalFinance() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ amount: "", date: "", description: "" });

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTransaction = async () => {
    if (!form.amount || !form.date || !form.description) return;
    const newTransaction = { ...form };

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });

    setTransactions([...transactions, newTransaction]);
    setForm({ amount: "", date: "", description: "" });
  };

  const deleteTransaction = async (id) => {
    await fetch(`/api/transactions?id=${id}`, { method: "DELETE" });
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const data = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    const index = acc.findIndex((d) => d.name === month);
    if (index > -1) acc[index].value += parseFloat(t.amount);
    else acc.push({ name: month, value: parseFloat(t.amount) });
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
        <Input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} className="mb-2" />
        <Input name="date" type="date" value={form.date} onChange={handleChange} className="mb-2" />
        <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="mb-2" />
        <Button onClick={addTransaction}>Add</Button>
      </Card>

      <Card className="mt-4">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        {transactions.map((t) => (
          <div key={t.id} className="flex justify-between items-center border-b py-2">
            <span>{t.date} - {t.description} - ${t.amount}</span>
            <Button variant="destructive" size="sm" onClick={() => deleteTransaction(t.id)}>Delete</Button>
          </div>
        ))}
      </Card>

      <Card className="mt-4">
        <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
