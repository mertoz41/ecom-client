import React from "react";
import Image from "next/image";
type TableProps = {
  headers: string[];
  data: Array<Record<string, any>>;
  imageFields?: string[]; // Optional: field keys that should be treated as images
  usage: string;
};

const Table: React.FC<TableProps> = ({
  headers,
  data,
  imageFields = [],
  usage,
}) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header) => {
                const key = header.toLowerCase(); // match field names (optional)
                const value = row[key];
                return (
                  <td key={key} className="px-4 py-3">
                    {imageFields.includes(key) && typeof value === "string" ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${usage}/${row.image}`}
                        height={60}
                        width={60}
                        alt={row.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      value ?? "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
