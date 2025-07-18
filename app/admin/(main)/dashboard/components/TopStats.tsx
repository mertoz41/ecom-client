const stats = [
  { label: "Total Sales", value: "$24,000" },
  { label: "Orders", value: "320" },
  { label: "Customers", value: "190" },
];
export default function TopStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-4 rounded-xl shadow">
          <div className="text-gray-500 text-sm">{stat.label}</div>
          <div className="text-2xl font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
