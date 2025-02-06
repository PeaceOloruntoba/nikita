import React from "react";

export function FeedbackCard({ card }) {
  return (
    <div className="p-6 rounded-lg flex items-center justify-between bg-white">
      <div className="flex items-center justify-center gap-4">
        {card?.icon}
        <span>{card?.name}</span>
      </div>
      <span>{card?.value}</span>
    </div>
  );
}
export default function Feedback() {
  return <div>Feedback</div>;
}
