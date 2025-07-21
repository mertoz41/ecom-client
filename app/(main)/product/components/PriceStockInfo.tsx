export default function PriceStockInfo({
  price,
  stock,
}: {
  price: number;
  stock: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-bold">${price}</span>
       
      </div>
      <div className="text-gray-500 mb-6 text-sm">
        <p>👁️ 28 viewing right now</p>
        <p>
          Only <span className="font-semibold">{stock}</span> item(s) left in stock
        </p>
      </div>
    </div>
  );
}
