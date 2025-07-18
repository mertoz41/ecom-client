export default function PriceStockInfo() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-bold">$125.00</span>
        <span className="line-through text-gray-400">$160.00</span>
        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm font-semibold">
          Save 23%
        </span>
      </div>
      <div className="text-gray-500 mb-6 text-sm">
        <p>👁️ 28 viewing right now</p>
        <p>
          Only <span className="font-semibold">3</span> item(s) left in stock
        </p>
      </div>
    </div>
  );
}
