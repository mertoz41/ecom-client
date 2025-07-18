"use client";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
const orderStatusData = [
  { name: "Delivered", value: 180 },
  { name: "Pending", value: 80 },
  { name: "Shipped", value: 60 },
];
const COLORS = ["#4ade80", "#facc15", "#60a5fa"];

export default function OrderStatus() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Order Status</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={orderStatusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {orderStatusData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
