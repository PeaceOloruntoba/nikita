import React, { useState } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import Button from "./shared/Button";

// Adder component for displaying questions and adding new ones
export function Adder() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([
    "What is your name?",
    "What is your favorite color?",
    "What is your age?",
  ]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion(""); // Clear input after adding
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg p-8">
      {/* Input to add a new question */}
      <div className="flex items-center gap-6 mb-4">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]"
          placeholder="Add Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdCheckCircleOutline size={18} />}
          onClick={handleAddQuestion}
        />
      </div>

      <hr />

      <div className="flex flex-col gap-4 text-[#A44B6F]/30">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 p-3 cursor-pointer ${
              selectedQuestion === question ? "bg-gray-200" : ""
            }`}
            onClick={() => handleQuestionClick(question)}
          >
            <span className="text-[#3A3A3A]">{question}</span>
            {selectedQuestion === question && (
              <Button
                className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
                value={<MdOutlineCancel size={18} />}
                onClick={() => setSelectedQuestion(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Lister component to display details of the selected question
export function Lister() {
  const [selectedQuestion] = useState("What is your name?"); // Assume the question is selected

  return (
    <div className="w-full h-full bg-white rounded-lg p-8 text-xl">
      <div className="flex flex-col gap-4 text-[#A44B6F]/30">
        {selectedQuestion ? (
          <div className="flex flex-col gap-6">
            <span
              className="border-none outline outline-[#4895E5]/20 p-3
              rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]"
            >
              {selectedQuestion}
            </span>
            <span
              className="border-none outline outline-[#4895E5]/20 p-3
              rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5] text-wrap"
            >
              Some details about the selected question go here.
            </span>
          </div>
        ) : (
          <span>No question selected</span>
        )}
      </div>
    </div>
  );
}
