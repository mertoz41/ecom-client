import Link from "next/link";
export default function ColorOptions({
  colors,
}: {
  colors: { _id: string; color: string }[];
}) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Color</h2>
      <div className="flex gap-4">
        {colors.map((color, i) => (
          <Link key={i} href={`/product/${color._id}`}>
            <button className="border cursor-pointer rounded-lg px-3 py-1">
              {color.color}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
