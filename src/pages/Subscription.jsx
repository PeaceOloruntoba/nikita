import React from "react";
import { Cards } from "../components/Subscrption";

export default function Subscription() {
  const subs = [
    {
      id: 1,
      value: "3 month",
      border: "#CD7F32",
    },
    {
      id: 2,
      value: "6 month",
      border: "#AAAFB6",
    },
    {
      id: 3,
      value: "12 month",
      border: "#FBBB00",
    },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-12">
        {subs?.map((sub) => (
          <Cards value={sub?.value} border={sub?.value} key={sub?.id} />
        ))}
      </div>
    </div>
  );
}
