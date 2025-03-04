export default function DashboardSummary({ transactions }) {
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const mostRecent = transactions.slice(-5);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold">Dashboard Summary</h2>
      <p><strong>Total Expenses:</strong> ₹{totalExpenses}</p>
      <h3 className="mt-4 text-md font-semibold">Recent Transactions:</h3>
      <ul>
        {mostRecent.map((t, index) => (
          <li key={index}>{t.description} - ₹{t.amount}</li>
        ))}
      </ul>
    </div>
  );
}
