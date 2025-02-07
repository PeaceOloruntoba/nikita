import React, { useState } from "react";
import { Cards, EditSubscription } from "../components/Subscrption";

export default function Subscription() {
  const [editModal, setEditModal] = useState(false);
  const [breakStart, setBreakStart] = useState(null);
  const [breakEnd, setBreakEnd] = useState(null);
  const [days, setDays] = useState([]);

  const subs = [
    { id: 1, value: "3 months", border: "#CD7F32" },
    { id: 2, value: "6 months", border: "#AAAFB6" },
    { id: 3, value: "12 months", border: "#FBBB00" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-12">
        {subs.map((sub) => (
          <Cards
            key={sub.id}
            value={sub.value}
            border={sub.border}
            onEdit={() => setEditModal(true)}
          />
        ))}
      </div>
      {editModal && (
        <EditSubscription
          onClose={() => setEditModal(false)}
          breakStart={breakStart}
          setBreakStart={setBreakStart}
          breakEnd={breakEnd}
          setBreakEnd={setBreakEnd}
          days={days}
          setDays={setDays}
        />
      )}
    </div>
  );
}

