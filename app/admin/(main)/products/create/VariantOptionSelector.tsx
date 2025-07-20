import React, { useState } from "react";

interface Variant {
  _id: string;
  name: string;
  options: string[];
}

interface Props {
  variants: Variant[];
  selectedOptions: Record<string, string[]>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const VariantOptionSelector: React.FC<Props> = ({ variants, selectedOptions, setSelectedOptions }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleOption = (variantId: string, option: string) => {
    setSelectedOptions(prev => {
      const current = prev[variantId] || [];
      const exists = current.includes(option);
      const updated = exists ? current.filter(o => o !== option) : [...current, option];

      return {
        ...prev,
        [variantId]: updated,
      };
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {variants.map(variant => (
        <div key={variant._id} style={{ position: "relative" }}>
          <div
            onClick={() => setOpenDropdown(openDropdown === variant._id ? null : variant._id)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              cursor: "pointer",
              userSelect: "none",
              backgroundColor: "#f9f9f9",
            }}
          >
            {variant.name}:{" "}
            {(selectedOptions[variant._id] || []).join(", ") || "Select options"} ▼
          </div>

          {openDropdown === variant._id && (
            <div
              style={{
                position: "absolute",
                zIndex: 10,
                top: "100%",
                left: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                marginTop: "4px",
                width: "100%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              {variant.options.map(option => (
                <label key={option} style={{ display: "block", marginBottom: "4px" }}>
                  <input
                    type="checkbox"
                    checked={selectedOptions[variant._id]?.includes(option) || false}
                    onChange={() => toggleOption(variant._id, option)}
                  />
                  <span style={{ marginLeft: "6px" }}>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VariantOptionSelector;
