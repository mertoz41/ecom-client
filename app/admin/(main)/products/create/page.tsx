"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import apiClient from "@/utils/apiClient";
import VariantOptionSelector from "./VariantOptionSelector";
import VariantTable from "./VariantTable";
export default function ProductEditor() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedCategory);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await apiClient("/categories");
      setCategories(response.data);
    } catch {
      console.error("something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((cat) => cat._id === e.target.value);
    if (selected) {
      setSelectedCategory(selected);
    }
  };
  console.log(tableData);
  const createProduct = async () => {
    console.log(name, description, tableData);
    // const primaryVariantName = selectedCategory.primaryVariant.name;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("selectedCategoryId", selectedCategory._id);

    tableData.forEach((primaryItem, pIndex) => {
      const primaryVariantName = selectedCategory.primaryVariant.name;

      formData.append(
        `variants[${pIndex}][primaryVariantName]`,
        primaryVariantName
      );
      formData.append(
        `variants[${pIndex}][primaryVariantValue]`,
        primaryItem.value
      );

      // Add sub-variants (e.g., size, stock, price, etc.)
      primaryItem.variants.forEach((variant, vIndex) => {
        Object.entries(variant).forEach(([key, value]) => {
          if (key !== "image") {
            formData.append(
              `variants[${pIndex}][variants][${vIndex}][${key}]`,
              String(value)
            );
          }
        });
      });

      // Add images array per primary variant
      Array.from(primaryItem.images).forEach((file, imgIndex) => {
        formData.append(`variants[${pIndex}][images][${imgIndex}]`, file);
      });
    });

    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("selectedCategoryId", selectedCategory._id);

    // // variants is your tableData state array
    // tableData.forEach((primaryItem, pIndex) => {
    //   // Append primary variant name and primary variant value (the selected option)
    //   // Assuming you have primaryVariantName available in scope
    //   formData.append(
    //     `variants[${pIndex}][primaryVariantName]`,
    //     primaryVariantName
    //   );
    //   formData.append(
    //     `variants[${pIndex}][primaryVariantValue]`,
    //     primaryItem.value
    //   );

    //   primaryItem.variants.forEach((variant, vIndex) => {
    //     // Append price, stock, and all variant option fields except image
    //     Object.entries(variant).forEach(([key, value]) => {
    //       if (key !== "image") {
    //         formData.append(
    //           `variants[${pIndex}][${vIndex}][${key}]`,
    //           String(value)
    //         );
    //       }
    //     });
    //   });

    //   // Append images separately (images is array of File)
    //   Array.from(primaryItem.images).forEach((file, i) => {
    //     formData.append(`variants[${pIndex}][images][${i}]`, file);
    //   });
    // });
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, value.name, value.size, value.type);
      } else {
        console.log(key, value);
      }
    }
    const response = await apiClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Edit Product</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Air Jordan 1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Sleek high-top sneakers..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select value={selectedCategory?._id || ""} onChange={handleChange}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="border-t my-6" />

      <h2 className="text-2xl font-semibold">Variants</h2>
      {selectedCategory && (
        <VariantOptionSelector
          variants={selectedCategory?.variants}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      )}
      {selectedCategory && (
        <VariantTable
          tableData={tableData}
          setTableData={setTableData}
          variants={selectedCategory.variants}
          primaryVariantId={selectedCategory.primaryVariant._id}
          selectedOptions={selectedOptions}
        />
      )}

      <div className="pt-6">
        <button
          onClick={() => createProduct()}
          className="w-full px-4 py-3 bg-black text-white cursor-pointer rounded-md hover:bg-gray-800 transition"
        >
          Save Product
        </button>
      </div>
    </div>
  );
}
