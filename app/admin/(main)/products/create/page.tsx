"use client";

import { useState } from "react";

export default function CreateProductPage() {
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [variants, setVariants] = useState([{ size: "", color: "" }]);
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) =>
    setSpecs(specs.filter((_, i) => i !== index));

  const addVariant = () => setVariants([...variants, { size: "", color: "" }]);
  const removeVariant = (index: number) =>
    setVariants(variants.filter((_, i) => i !== index));

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your form submission logic here
    alert("Product submitted! (hook this to your backend)");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <input type="text" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea rows={4} className="w-full p-2 border rounded" />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select className="w-full p-2 border rounded">
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Footwear</option>
            <option>Other</option>
          </select>
        </div>

        {/* Product Images */}
        <div>
          <label className="block font-medium">Product Images</label>
          <input type="file" multiple className="w-full p-2 border rounded" />
        </div>

        {/* Specifications */}
        <div>
          <label className="block font-medium mb-2">Specifications</label>
          {specs.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                placeholder="Key"
                value={spec.key}
                onChange={(e) =>
                  setSpecs(
                    specs.map((s, i) =>
                      i === index ? { ...s, key: e.target.value } : s
                    )
                  )
                }
                className="w-1/2 p-2 border rounded"
              />
              <input
                placeholder="Value"
                value={spec.value}
                onChange={(e) =>
                  setSpecs(
                    specs.map((s, i) =>
                      i === index ? { ...s, value: e.target.value } : s
                    )
                  )
                }
                className="w-1/2 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="text-red-600"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpec}
            className="text-sm text-blue-600 underline"
          >
            + Add Specification
          </button>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium">Tags (comma separated)</label>
          <input
            type="text"
            onChange={handleTagInput}
            placeholder="e.g. new, summer, sale"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={() => setFeatured(!featured)}
          />
          <label>Featured Product</label>
        </div>

        {/* Variants */}
        <div>
          <label className="block font-medium mb-2">Product Variants</label>
          {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                placeholder="Size"
                value={variant.size}
                onChange={(e) =>
                  setVariants(
                    variants.map((v, i) =>
                      i === index ? { ...v, size: e.target.value } : v
                    )
                  )
                }
                className="w-1/2 p-2 border rounded"
              />
              <input
                placeholder="Color"
                value={variant.color}
                onChange={(e) =>
                  setVariants(
                    variants.map((v, i) =>
                      i === index ? { ...v, color: e.target.value } : v
                    )
                  )
                }
                className="w-1/2 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-600"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="text-sm text-blue-600 underline"
          >
            + Add Variant
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
