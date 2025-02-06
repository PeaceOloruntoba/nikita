import React, { useState } from "react";
import { negativeFeedback, positiveFeedback, totalFeedback } from "../assets";

export default function Feedback() {
  const [feedbackStatus, setFeedbackStatus] = useState();

  const feedbacks = [
    {
      id: 1,
      firstName: "Surename",
      lastName: "Name",
      stars: 5.0,
      status: "positive",
      feedback:
        "Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback ",
    },
    {
      id: 2,
      firstName: "Surename",
      lastName: "Name",
      stars: 5.0,
      status: "positive",
      feedback:
        "Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback ",
    },
    {
      id: 3,
      firstName: "Surename",
      lastName: "Name",
      stars: 5.0,
      status: "negative",
      feedback:
        "Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback ",
    },
  ];

  // Calculate feedback counts dynamically
  const totalFeedbackCount = feedbacks.length;
  const positiveFeedbackCount = feedbacks.filter(
    (fb) => fb.status === "positive"
  ).length;
  const negativeFeedbackCount = feedbacks.filter(
    (fb) => fb.status === "negative"
  ).length;

  const feedbackCard = [
    {
      id: 1,
      name: "Total Feedback",
      value: totalFeedbackCount,
      icon: <img src={totalFeedback} alt="Total Feedback" />,
    },
    {
      id: 2,
      name: "Positive Feedback",
      value: positiveFeedbackCount,
      icon: <img src={positiveFeedback} alt="Positive Feedback" />,
    },
    {
      id: 3, // Fixed duplicate ID
      name: "Negative Feedback",
      value: negativeFeedbackCount,
      icon: <img src={negativeFeedback} alt="Negative Feedback" />,
    },
  ];

  return (
    <div>
      {feedbackCard.map((card) => (
        <div
          key={card.id}
          className="p-4 border rounded-lg shadow-md flex items-center gap-4"
        >
          {card.icon}
          <div>
            <h3 className="font-bold">{card.name}</h3>
            <p className="text-lg">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
