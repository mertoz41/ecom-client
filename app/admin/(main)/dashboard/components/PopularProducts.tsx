const popularProducts = [
  { name: "T-Shirt", sales: 120 },
  { name: "Hoodie", sales: 95 },
  { name: "Sneakers", sales: 78 },
];
export default function PopularProducts() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
      <ul className="divide-y text-sm">
        {popularProducts.map((product) => (
          <li key={product.name} className="py-2 flex justify-between">
            <span>{product.name}</span>
            <span className="text-gray-500">{product.sales} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
