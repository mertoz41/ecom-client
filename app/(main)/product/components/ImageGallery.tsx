export default function ImageGallery() {
  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <img
            key={i}
            src={`/images/shoe-thumb-${i}.jpg`} // replace with your thumbnails
            alt={`Shoe thumbnail ${i}`}
            className="w-16 h-16 rounded-lg cursor-pointer object-cover border border-gray-200 hover:border-black"
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="relative bg-white rounded-lg shadow-md w-[400px] h-[400px] flex items-center justify-center">
        <img
          src="/images/shoe-main.jpg" // replace with main shoe image
          alt="Main shoe"
          className="max-w-full max-h-full object-contain"
        />
        {/* Navigation Arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100">
          ‹
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100">
          ›
        </button>
      </div>
    </div>
  );
}
