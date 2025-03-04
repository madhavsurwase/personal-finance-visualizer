import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#FF5733", "#33FF57", "#5733FF", "#FF33A8", "#33FFF3"];

export default function CategoryPieChart({ transactions }) {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    value: categoryTotals[category],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
