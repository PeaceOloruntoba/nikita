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
  const feedbackCard = [
    {
      id: 1,
      name: "Total Feedback",
      value: feedbacks.length,
      icon: <img src={totalFeedback} alt="" />,
    },
    {
      id: 2,
      name: "Positive Feedback",
      value: 120,
      icon: <img src={positiveFeedback} alt="" />,
    },
    {
      id: 2,
      name: "Negative Feedback",
      value: 80,
      icon: <img src={negativeFeedback} alt="" />,
    },
  ];
  return <div>Feedback</div>;
}
