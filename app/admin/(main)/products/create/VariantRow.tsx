export default function VariantRow({
  secondaryKeys,
  item,
  variant,
  index,
  primaryIndex,
  handleVariantChange,
  handleImageChange,
}) {
  return (
    <tr>
      {index === 0 && (
        <>
          <td rowSpan={item.variants.length} className=" border">
            <input
              type="file"
              accept="image/*"
              className="w-full"
              multiple
              onChange={(e) => handleImageChange(primaryIndex, e.target.files)}
            />
          </td>
          <td rowSpan={item.variants.length} className=" border">
            <div>{item.value}</div>
          </td>
        </>
      )}
      {secondaryKeys.map((key) => (
        <td key={key} className="border px-3 py-2">
          {variant[key]}
        </td>
      ))}
      <td className="border px-3 py-2">
        <input
          type="number"
          value={variant.price}
          onChange={(e) =>
            handleVariantChange(
              primaryIndex,
              index,
              "price",
              Number(e.target.value)
            )
          }
          className="w-full border rounded px-2 py-1"
        />
      </td>
      <td className="border px-3 py-2">
        <input
          value={variant.stock}
          type="number"
          className="w-full border rounded px-2 py-1"
          onChange={(e) =>
            handleVariantChange(
              primaryIndex,
              index,
              "stock",
              Number(e.target.value)
            )
          }
        />
      </td>
    </tr>
  );
}
