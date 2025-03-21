import React, { useState, useRef } from "react";
import { annawine } from "../../assets";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "sonner";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaPaperPlane,
} from "react-icons/fa";

export default function Ai() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioContext = useRef(null);
  const audioSource = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const resp = await axiosInstance.post("/chat", { message });
      setResponse(resp.data.data.response);
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Error sending message:", error);
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
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    try {
      const resp = await axiosInstance.post("/chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(resp.data.data.response);
    } catch (error) {
      toast.error("Failed to send audio.");
      console.error("Error sending audio:", error);
    }
  };

  const handleVideoChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      audioContext.current = new AudioContext();
      audioSource.current =
        audioContext.current.createMediaStreamSource(stream);

      const responseStream = await axiosInstance.post("/chat", null, {
        responseType: "stream",
      });

      const audioDestination =
        audioContext.current.createMediaStreamDestination();
      audioSource.current.connect(audioDestination);

      const audioReader = responseStream.data.getReader();

      const processAudio = async () => {
        const { done, value } = await audioReader.read();
        if (done) return;
        audioContext.current.decodeAudioData(value.buffer, (buffer) => {
          const source = audioContext.current.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.current.destination);
          source.start();
        });
        processAudio();
      };
      processAudio();
    } catch (error) {
      toast.error("Failed to start video chat.");
      console.error("Error starting video chat:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center text-xl font-semibold relative">
      <img src={annawine} alt="" className="w-full h-full" />
      <div className="absolute w-full bottom-0">
        <div className="bg-transparent p-4 w-full">
          {/* Chat Messages Display */}
          <div className="mb-4 max-h-60 overflow-y-auto">
            {response && (
              <div className="bg-white/40 p-2 rounded-lg mb-2">{response}</div>
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
              <FaPaperPlane />
            </button>
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white p-2 rounded-lg"
                aria-label="Stop Recording"
              >
                <FaMicrophoneSlash />
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
