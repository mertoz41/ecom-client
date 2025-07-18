export default function ColorOptions(){
    return(
        <div className="mb-6">
        <h2 className="font-semibold mb-2">Color</h2>
        <div className="flex gap-4">
          {/* Color circles */}
          {[
            { color: "bg-beige-300", label: "Light Bone" },
            { color: "bg-gray-200", label: "White" },
            { color: "bg-gray-900", label: "Black" },
          ].map(({ color, label }, i) => (
            <button
              key={i}
              aria-label={label}
              className={`w-8 h-8 rounded-full border border-gray-300 hover:border-black focus:outline-none ${color}`}
            />
          ))}
        </div>
      </div>
    )
}