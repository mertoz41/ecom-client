export default function Rating(){
    return(
        <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm">87 Customer Review</span>
          </div>
    )
}