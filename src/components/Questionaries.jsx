import React, { useState, useEffect } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import Button from "./shared/Button";
import useQuestionStore from "../store/useQuestionStore"; // Importing the Zustand store

// Adder component for displaying questions and adding new ones
export function Adder() {
  const [newQuestion, setNewQuestion] = useState("");
  const {
    questions,
    isLoading,
    createQuestion,
    deleteQuestion,
    getQuestions,
    selectQuestion,
  } = useQuestionStore((state) => state);

  // Fetch questions when component mounts
  useEffect(() => {
    getQuestions(); // Fetch questions on mount
  }, [getQuestions]);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      createQuestion({ text: newQuestion });
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
        {questions.length === 0 ? (
          <span>No questions available. Add a new question!</span>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              className="flex items-center gap-6 p-3 cursor-pointer"
              onClick={() => selectQuestion(question)}
            >
              <span className="text-[#3A3A3A]">{question.text}</span>
              <Button
                className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
                value={<MdOutlineCancel size={18} />}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent question select on delete click
                  deleteQuestion(question.id); // Delete question
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Lister component to display details of the selected question
export function Lister() {
  const { selectedQuestion, deselectQuestion } = useQuestionStore(
    (state) => state
  );

  return (
    <div className="w-full h-full bg-white rounded-lg p-8 text-xl">
      <div className="flex flex-col gap-4 text-[#A44B6F]/30">
        {selectedQuestion ? (
          <div className="flex flex-col gap-6">
            <span className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]">
              {selectedQuestion.text}
            </span>
            <span className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5] text-wrap">
              Some details about the selected question go here.
            </span>
            <Button
              className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
              value="Deselect"
              onClick={deselectQuestion}
            />
          </div>
        ) : (
          <span>No question selected</span>
        )}
      </div>
    </div>
  );
}
