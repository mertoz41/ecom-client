"use client";

import { useState } from "react";

type VariantData = {
  name: string;
  options: string[];
};

type SelectedVariant = {
  group: string;
};

type Props = {
  data: VariantData[];

  primaryVariant: string;
  setPrimaryVariant: (e: string) => void;
  selectedVariants: VariantData[];
  setSelectedVariants: (value: VariantData) => void;
};

export default function VariantSelector({
  data,
  primaryVariant,
  setPrimaryVariant,
  selectedVariants,
  setSelectedVariants,
}: Props) {
  const toggleVariant = (variant: string) => {
    const exists = selectedVariants.some((v) => v.name === variant.name);
    if (exists) {
      setSelectedVariants((prev) =>
        prev.filter((v) => !(v.name === variant.name))
      );
    } else {
      setSelectedVariants((prev) => [...prev, variant]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Variant groups as checkboxes */}

      <h1>Apply variants to category</h1>
      <div className="space-y-4">
        {data.map((variant, i) => (
          <div key={i}>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                // checked={isChecked}
                onChange={() => toggleVariant(variant)}
                className="accent-blue-600"
              />
              {variant.name}
            </label>
          </div>
        ))}
      </div>
      <h1>Select primary variant</h1>
      {selectedVariants.map((vari, i) => (
        <div key={i}>
          <input
            onChange={() => setPrimaryVariant(vari._id)}
            checked={primaryVariant === vari._id}
            type="checkbox"
          />
          {vari.name}
        </div>
      ))}
    </div>
  );
}
