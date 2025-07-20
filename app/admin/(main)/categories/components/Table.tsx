import Image from "next/image";
type Category = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

type Props = {
  categories: Category[];
};
export default function CategoryTable({ categories }: Props) {
  console.log(categories[2].primaryVariant);
  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 border-b">#</th>
            <th className="px-4 py-3 border-b">Image</th>
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Description</th>
            <th className="px-4 py-3 border-b">Variants</th>
            <th className="px-4 py-3 border-b">Primary Variant</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                <Image
                  src={`http://localhost:3001/uploads/categories/${category.image}`}
                  height={60}
                  width={60}
                  alt={category.name}
                  className="w-12 h-12 object-cover rounded"
                />
               
              </td>
              <td className="px-4 py-3 text-black font-medium">
                {category.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {category.description}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {category.variants.map((variant, i) => (
                  <div key={i}>{variant.name}</div>
                ))}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {category.primaryVariant?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
