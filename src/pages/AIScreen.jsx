import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import useUserStore from "../store/useUserStore";
import { annawine } from "../assets";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaPaperPlane,
  FaRegStopCircle,
  FaSpinner,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurant_id, table_id, ai_agent_id, userData } =
    location.state || {};
  const { sendChatMessage, postReview, isLoading } = useUserStore();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Welcome! Ask me anything about the restaurant." },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewType, setReviewType] = useState("positive");
  const [reviewMessage, setReviewMessage] = useState("");
  const [supportsText, setSupportsText] = useState(false);
  const [supportsAudio, setSupportsAudio] = useState(false);
  const [supportsVideo, setSupportsVideo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (userData?.restaurant) {
      setSupportsText(
        userData.restaurant.text_support ||
          userData.restaurant.audio_support ||
          userData.restaurant.video_support
      );
      setSupportsAudio(
        userData.restaurant.audio_support || userData.restaurant.video_support
      );
      setSupportsVideo(userData.restaurant.video_support);
    }
    fetchChatHistory();
  }, [userData]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const resp = await axiosInstance.get("/ai/messages");
      setMessages(
        resp.data.messages.map((msg) => ({
          from: msg.role,
          text: msg.content,
        }))
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch chat history"
      );
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !supportsText) {
      if (!supportsText) {
        toast.error("Text chat is not supported by this restaurant");
      }
      return;
    }
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsSending(true);
    try {
      const aiResponse = await sendChatMessage(input, ai_agent_id);
      setMessages([...newMessages, { from: "ai", text: aiResponse }]);
    } catch (error) {
      toast.error("Failed to send message");
      setMessages([
        ...newMessages,
        { from: "ai", text: "Sorry, something went wrong. Try again!" },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const startRecording = async () => {
    if (!supportsAudio) {
      toast.error("Audio chat is not supported by this restaurant");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        sendAudio(audioBlob);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      toast.info("Recording started");
    } catch (error) {
      toast.error("Failed to start recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      toast.info("Recording stopped");
    }
  };

  const sendAudio = async (audioBlob) => {
    setIsSending(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    try {
      const resp = await axiosInstance.post("/audio/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const transcribedText = resp.data.transcribedText;
      const newMessages = [
        ...messages,
        { from: "user", text: transcribedText },
      ];
      setMessages(newMessages);

      const aiResp = await sendChatMessage(transcribedText, ai_agent_id);
      setMessages([...newMessages, { from: "ai", text: aiResp }]);
    } catch (error) {
      toast.error("Failed to transcribe or send audio");
      setMessages([
        ...messages,
        { from: "ai", text: "Sorry, something went wrong. Try again!" },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleVideoChat = () => {
    if (!supportsVideo) {
      toast.error("Video chat is not supported by this restaurant");
      return;
    }
    toast.info("Video chat functionality is not implemented yet");
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
    <div className="min-h-screen flex flex-col relative">
      <img
        src={annawine}
        alt="Background"
        className="w-full h-full object-cover absolute"
      />
      <div className="absolute w-full h-full flex flex-col">
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
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg mb-2 ${
                msg.from === "user"
                  ? "ml-auto bg-gray-200/30 text-white"
                  : "mr-auto bg-gray-200/30 text-white max-w-72"
              }`}
            >
              {msg.from === "ai" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
          {(isLoading || isSending) && (
            <div className="flex justify-center">
              <FaSpinner className="animate-spin h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        {!supportsText && (<p className="flex items-center justify-center text-white text-3xl font-semibold animate-pulse">AI Chat Not Supported for this restaurant.</p>)}
        <div className="p-4 bg-transparent">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Chat with Annawine"
              className={`flex-1 p-3 rounded-lg border bg-white/40 focus:outline-none focus:ring-2 focus:ring-primary ${
                !supportsText ? "bg-gray-200/40 cursor-not-allowed" : ""
              }`}
              disabled={isLoading || isSending || !supportsText}
            />
            {supportsText && (
              <button
                onClick={handleSend}
                disabled={isLoading || isSending}
                className="p-3 rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
                aria-label="Send"
              >
                {isSending ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            )}
            {supportsAudio && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-lg text-white ${
                  isRecording ? "bg-red-500" : "bg-gray-500"
                } hover:${isRecording ? "bg-red-600" : "bg-gray-600"}`}
                aria-label={isRecording ? "Stop Recording" : "Start Recording"}
              >
                {isRecording ? <FaRegStopCircle /> : <FaMicrophone />}
              </button>
            )}
            {supportsVideo && (
              <button
                onClick={handleVideoChat}
                className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                aria-label="Start Video Chat"
              >
                <FaVideo />
              </button>
            )}
          </div>
        </div>
      </div>
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              Submit Review
            </h3>
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
                disabled={isLoading || isSending}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
              >
                {isLoading || isSending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
