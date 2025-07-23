"use client";
import React from "react";
import VariantRow from "./VariantRow";
import { useState, useEffect } from "react";
interface Variant {
  [key: string]: string | number;
  Stock: number;
  Price: number;
}

interface VariantSet {
  primary: string;
  images: (string | File)[];
  variants: Variant[];
}

interface Props {
  primaryVariantId: string;
  selectedOptions: any[];
  variants: any[];
  setTableData: () => void;
  tableData: any[];
  data: Record<string, VariantSet>;
  nonPrimaryVariantNames: string[];
  onDataChange: (updated: Record<string, VariantSet>) => void;
}

const VariantTable: React.FC<Props> = ({
  primaryVariantId,
  selectedOptions,
  variants,
  tableData,
  setTableData,
}) => {
  const primaryOptions = selectedOptions[primaryVariantId] || [];
  const secondaryVariantIds = Object.keys(selectedOptions).filter(
    (id) => id !== primaryVariantId
  );
  const primaryName = variants.find(
    (vari) => vari._id === primaryVariantId
  ).name;

  //   const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!primaryVariantId || Object.keys(selectedOptions).length === 0) return;

    const primaryOptions = selectedOptions[primaryVariantId] || [];
    const secondaryVariantIds = Object.keys(selectedOptions).filter(
      (id) => id !== primaryVariantId
    );
    const primaryName =
      variants.find((vari) => vari._id === primaryVariantId)?.name || "";
    const variantNames = Object.fromEntries(
      variants.map((v) => [v._id, v.name])
    );

    const getCombinations = (
      variantIdIndex: number,
      current: Record<string, string>
    ): OptionCombination[] => {
      if (variantIdIndex >= secondaryVariantIds.length) {
        return [
          {
            ...current,
            price: "",
            stock: "",
          },
        ];
      }

      const variantId = secondaryVariantIds[variantIdIndex];
      const variantName = variantNames[variantId];
      const options = selectedOptions[variantId];

      return options.flatMap((option) =>
        getCombinations(variantIdIndex + 1, {
          ...current,
          [variantName]: option,
        })
      );
    };

    const transformed = primaryOptions.map((primaryOption) => ({
      value: primaryOption,
      id: primaryVariantId,
      images: [],
      variants: getCombinations(0, {}),
    }));

    setTableData(transformed);
  }, [selectedOptions, primaryVariantId, variants]);

  const secondaryKeys = tableData[0]?.variants?.length
    ? Object.keys(tableData[0].variants[0]).filter(
        (k) => !["price", "stock", "image"].includes(k)
      )
    : [];

  const handleVariantChange = (
    primaryIndex: number,
    variantIndex: number,
    field: "price" | "stock",
    value: number
  ) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[primaryIndex] = {
        ...updated[primaryIndex],
        variants: [...updated[primaryIndex].variants],
      };
      updated[primaryIndex].variants[variantIndex] = {
        ...updated[primaryIndex].variants[variantIndex],
        [field]: value,
      };
      return updated;
    });
  };

  const handleImageChange = (primaryIndex: number, value: File) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[primaryIndex] = {
        ...updated[primaryIndex],
        images: value,
      };

      return updated;
    });
  };
  return (
    secondaryVariantIds.length && (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Images</th>
            <th className="border px-3 py-2">{primaryName}</th>
            {secondaryKeys.map((key) => (
              <th key={key} rowSpan={2} className="border px-3 py-2">
                {key}
              </th>
            ))}
            <th rowSpan={2} className="border px-3 py-2">
              Price
            </th>
            <th rowSpan={2} className="border px-3 py-2">
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, primaryIndex) =>
            item.variants.map((variant, variantIndex) => (
              <VariantRow
                key={`${item.value}-${variantIndex}`}
                secondaryKeys={secondaryKeys}
                item={item}
                index={variantIndex}
                primaryIndex={primaryIndex}
                variant={variant}
                handleImageChange={handleImageChange}
                handleVariantChange={handleVariantChange}
              />
            ))
          )}
        </tbody>
      </table>
    )
  );
};

const th = {
  borderBottom: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};
const td = {
  borderBottom: "1px solid #eee",
  padding: "8px",
  verticalAlign: "top",
};

export default VariantTable;
