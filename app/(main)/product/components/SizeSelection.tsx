export default function SizeSelection() {
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
      <div className="grid grid-cols-5 gap-2">
        {[
          "UK 6.5",
          "UK 7",
          "UK 7.5",
          "UK 8",
          "UK 8.5",
          "UK 9",
          "UK 9.5",
          "UK 10",
          "UK 10.5",
          "UK 11",
          "UK 11.5",
        ].map((size, i) => (
          <button
            key={i}
            className={`py-2 border rounded text-sm ${
              size === "UK 6.5"
                ? "bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
