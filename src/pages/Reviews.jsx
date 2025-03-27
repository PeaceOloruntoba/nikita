import React, { useEffect, useState } from "react";
import { negativeFeedback, positiveFeedback, totalFeedback } from "../assets";
import { FeedbackTitleCard, FeedbackCard } from "../components/Feedback";
import useAdminStore from "../store/useAdminStore"; // Import Zustand Store
import Spinner from "../components/shared/Spinner";

export default function Feedback() {
  const { feedbacks, getFeedbacks, isLoading } = useAdminStore();
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const totalFeedbackCount = feedbacks?.totalFeedback;
  const positiveFeedbackCount = feedbacks?.totalPositive;
  const negativeFeedbackCount = feedbacks?.totalNegative;

  const feedbackCard = [
    {
      id: 1,
      name: "Total Feedback",
      value: totalFeedbackCount,
      status: null,
      icon: <img src={totalFeedback} alt="Total Feedback" />,
    },
    {
      id: 2,
      name: "Positive Feedback",
      value: positiveFeedbackCount,
      status: 1,
      icon: <img src={positiveFeedback} alt="Positive Feedback" />,
    },
    {
      id: 3,
      name: "Negative Feedback",
      value: negativeFeedbackCount,
      status: 0,
      icon: <img src={negativeFeedback} alt="Negative Feedback" />,
    },
  ];

  const displayFeedbacks =
    feedbackStatus === null
      ? feedbacks?.feedbacks
      : feedbacks?.feedbacks.filter((fb) => fb.is_positive === feedbackStatus);

  return (
    <div className="p-6 text-[#3a3a3a] flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
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
      {isLoading ? (
        <p className="text-center text-lg">
          <Spinner />
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {displayFeedbacks?.length > 0 ? (
            displayFeedbacks.map((card) => (
              <FeedbackCard key={card.id} card={card} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No feedback available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
