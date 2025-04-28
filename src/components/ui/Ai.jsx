import React, { useState, useRef, useEffect } from "react";
import { annawine } from "../../assets";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "sonner";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaPaperPlane,
  FaRegStopCircle,
  FaSpinner,
} from "react-icons/fa";
import { FaRegCircleStop } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Ai() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioContext = useRef(null);
  const audioSource = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const fetchChatHistory = async () => {
    try {
      const resp = await axiosInstance.get("/ai/messages");
      setChatMessages(resp.data.messages);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error fetching chat history:", error);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const resp = await axiosInstance.post("/ai/messages", { message });
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: message },
        { role: "assistant", content: resp.data.message },
      ]);
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const startRecording = async () => {
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
    } catch (error) {
      toast.error("Failed to start recording.");
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
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

      console.log(resp);

      // Send transcribed text to your AI agent
      const aiResp = await axiosInstance.post("/ai/messages", {
        message: transcribedText,
      });

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: transcribedText },
        { role: "assistant", content: aiResp.data.message },
      ]);
    } catch (error) {
      toast.error("Failed to send audio or transcribe.");
      console.error("Error sending audio:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleVideoChat = async () => {
    // Implement video chat logic here
    toast.info("Video chat functionality is not implemented yet.");
  };

  return (
    <div className="h-screen flex items-center justify-center text-xl font-semibold relative">
      <img src={annawine} alt="" className="w-full h-full object-cover" />
      <div className="absolute w-full bottom-0">
        <div className="bg-transparent p-4 w-full">
          {/* Chat Messages Display */}
          <div
            ref={chatContainerRef}
            className="my-4 pt-24 max-h-screen overflow-y-scroll hide-scrollbar"
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg mb-2 ${
                  msg.role === "user"
                    ? "bg-gray-200/30 ml-auto w-fit text-white"
                    : "bg-gray-200/30 mr-auto max-w-72 w-fit text-white"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin" />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Chat with Annawine"
              className="w-full bg-white/40 border border-primary outline-none rounded-lg p-2"
              value={message}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary text-white p-2 rounded-lg"
              aria-label="Send"
            >
              {isSending ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white p-2 rounded-lg"
                aria-label="Stop Recording"
              >
                <FaRegStopCircle />
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="bg-gray-500 text-white p-2 rounded-lg"
                aria-label="Start Recording"
              >
                <FaMicrophone />
              </button>
            )}
            <button
              onClick={handleVideoChat}
              className="bg-blue-500 text-white p-2 rounded-lg"
              aria-label="Start Video Chat"
            >
              <FaVideo />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
