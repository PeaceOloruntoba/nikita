import React, { useEffect } from "react";
import useMenuStore from "../store/useMenuStore";

export default function QrCodes() {
  const { tables, getTables } = useMenuStore();

  useEffect(() => {
    getTables();
  }, [getTables]);

  console.log(tables)

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Qr Codes</h2>

      {tables.length === 0 ? (
        <>
          <p className="text-gray-500">No qr codes available.</p>
          <p className="text-gray-500">Go and some tables in settings.</p>
        </>
      ) : (
        <ul className="space-y-2">
          {tables.map((item) => (
            <li
              key={item?.table_number}
              className="p-2 border-b border-gray-300 text-gray-800"
            >
              {item.table_number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
