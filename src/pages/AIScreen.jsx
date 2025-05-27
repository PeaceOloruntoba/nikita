import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useUserStore from "../store/useUserStore";

export default function AIScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurant_id, table_id, ai_agent_id, userData } = location.state || {};
  const { sendChatMessage, postReview, isLoading } = useUserStore();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Welcome! Ask me anything about the restaurant." },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewType, setReviewType] = useState("positive");
  const [reviewMessage, setReviewMessage] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    const aiResponse = await sendChat, setMessages([...newMessages, { from: "ai", text: aiResponse }]);
  };

  const handleSubmitReview = async () => {
    if (!reviewMessage.trim()) {
      toast.error("Please enter a review message");
      return;
    }
    try {
      await postReview(reviewMessage, restaurant_id, reviewType);
      setIsReviewModalOpen(false);
      setReviewMessage("");
      setReviewType("positive");
    } catch (error) {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "ur[](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4)" }}>
      <div className="bg-black/30 p-4 flex items-center justify-between">
        <button onClick={() => navigate("/scanqr")}>
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsReviewModalOpen(true);
              }}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Post Review
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg mb-2 ${
              msg.from === "user"
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-white/80 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 bg-white/80 rounded-t-3xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
            className="flex-1 p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-3 rounded-full bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Submit Review</h3>
            <div className="flex justify-around mb-4">
              {["positive", "neutral", "negative"].map((type) => (
                <button
                  key={type}
                  onClick={() => setReviewType(type)}
                  className={`px-4 py-2 rounded-lg border ${
                    reviewType === type
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <textarea
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-3 rounded-lg border min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={isLoading}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}