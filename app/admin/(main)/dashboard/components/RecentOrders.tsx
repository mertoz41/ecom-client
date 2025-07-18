const recentOrders = [
  { id: "ORD001", customer: "Alice Smith", amount: "$120", status: "Shipped" },
  { id: "ORD002", customer: "John Doe", amount: "$89", status: "Pending" },
  { id: "ORD003", customer: "Jane Roe", amount: "$230", status: "Delivered" },
];

export default function RecentOrders() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b last:border-none">
              <td className="py-2">{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>
                <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
