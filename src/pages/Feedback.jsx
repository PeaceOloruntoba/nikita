import React, { useState } from "react";
import { negativeFeedback, positiveFeedback, totalFeedback } from "../assets";
import { FeedbackTitleCard, FeedbackCard } from "../components/Feedback";

export default function Feedback() {
  const [feedbackStatus, setFeedbackStatus] = useState(null);

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
      status: null, // Shows all feedbacks
      icon: <img src={totalFeedback} alt="Total Feedback" />,
    },
    {
      id: 2,
      name: "Positive Feedback",
      value: positiveFeedbackCount,
      status: "positive",
      icon: <img src={positiveFeedback} alt="Positive Feedback" />,
    },
    {
      id: 3,
      name: "Negative Feedback",
      value: negativeFeedbackCount,
      status: "negative",
      icon: <img src={negativeFeedback} alt="Negative Feedback" />,
    },
  ];

  // Filter feedbacks based on selected feedbackStatus
  const displayFeedbacks =
    feedbackStatus === null
      ? feedbacks
      : feedbacks.filter((fb) => fb.status === feedbackStatus);

  return (
    <div className="p-6 text-[#3a3a3a] flex flex-col gap-12">
      <div className="grid grid-cols-3 gap-12">
        {feedbackCard.map((card) => (
          <button
            key={card.id}
            onClick={() => setFeedbackStatus(card.status)}
            className={`transition-all duration-200 ${
              feedbackStatus === card.status ? "bg-gray-200" : ""
            }`}
          >
            <FeedbackTitleCard card={card} />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-12">
        {displayFeedbacks.map((card) => (
          <FeedbackCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
