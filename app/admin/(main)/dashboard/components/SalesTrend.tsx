"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
const salesTrend = [
  { month: "Jan", sales: 3000 },
  { month: "Feb", sales: 5000 },
  { month: "Mar", sales: 4000 },
  { month: "Apr", sales: 6500 },
  { month: "May", sales: 7000 },
  { month: "Jun", sales: 6000 },
];
export default function SalesTrend() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={salesTrend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#4f46e5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
