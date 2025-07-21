export default function Detail({ description }: { description: string }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">About the product</h3>
      <p className="mb-2 text-gray-700 text-sm">{description}</p>
    </div>
  );
}
