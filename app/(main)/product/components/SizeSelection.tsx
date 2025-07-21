export default function SizeSelection({
  sizes,
}: {
  sizes: { size: string }[];
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Select Size</h2>
        <a
          href="#"
          className="text-sm text-gray-500 underline hover:text-black"
        >
          Size guide
        </a>
      </div>
      <div className="flex gap-4">
        {sizes.map(({ size }, i) => (
          <button className="border px-3 py-1 rounded-lg" key={i}>
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
