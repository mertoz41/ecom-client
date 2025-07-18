export default function CartFavoriteButtons(){
    return(
        <div className="flex flex-col gap-3 mb-6">
        <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900">
          Add to Cart
        </button>
        <button className="w-full border border-gray-300 py-3 rounded font-semibold flex justify-center items-center gap-2 hover:border-black">
          Favorite{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>
      </div>  
    )
}