import React, { useState, useEffect } from "react";
import {
  MdCheckCircleOutline,
  MdOutlineCancel,
  MdAddCircleOutline,
} from "react-icons/md";
import Button from "./shared/Button";
import useQuestionStore from "../store/useQuestionStore";
import ConfirmationModal from "./shared/ConfirmationModal";

// Adder component for displaying questions and adding new ones
export function Adder() {
  const [newQuestion, setNewQuestion] = useState("");
  const [content, setContent] = useState(null); // Content can be null
  const [answers, setAnswers] = useState(["Yes", "No"]);
  const [correctAnswer, setCorrectAnswer] = useState(["yes"]);
  const [answerType, setAnswerType] = useState("radio"); // Default type is radio
  const [showModal, setShowModal] = useState(false); // Modal visibility for form completion
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation modal visibility
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

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]); // Add an empty answer field
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index); // Remove the answer at the specified index
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setShowModal(true); // Show the modal to complete the question details
    }
  };

  const handleSubmitQuestion = () => {
    const questionData = {
      title: newQuestion,
      content: content || null,
      answers,
      answer_type: answerType,
      correct_answer: correctAnswer,
    };

    // Submit the question through the store
    createQuestion(questionData);
    setShowModal(false); // Close modal after submission
    setShowConfirmation(true); // Show confirmation modal
  };

  return (
    <div className="w-full h-full bg-white rounded-lg p-4">
      {/* Input to add a new question */}
      <div className="flex items-center gap-6 mb-4">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
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

      {/* Modal to complete the question details */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-[#3A3A3A]">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4 text-[#3A3A3A]">
              Complete the Question Details
            </h3>
            <textarea
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Optional: Add content for the question"
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mb-4">
              <h4 className="font-medium text-[#3A3A3A]">Answers:</h4>
              {answers.map((answer, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                  <Button
                    className="cursor-pointer bg-[#D92C4A] text-white p-2 rounded-lg"
                    value={<MdOutlineCancel size={18} />}
                    onClick={() => handleRemoveAnswer(index)} // Remove answer button
                  />
                </div>
              ))}
              {/* Add new answer button */}
              <Button
                className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
                value={<MdAddCircleOutline size={18} />}
                onClick={handleAddAnswer}
              />
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-[#3A3A3A]">Answer Type:</h4>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={answerType}
                onChange={(e) => setAnswerType(e.target.value)}
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-[#3A3A3A]">Correct Answer:</h4>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={correctAnswer[0]}
                onChange={(e) => {
                  const newCorrectAnswer = [e.target.value];
                  setCorrectAnswer(newCorrectAnswer);
                }}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                className="bg-[#4895E5] text-white p-3 rounded-lg"
                value="Submit"
                onClick={handleSubmitQuestion}
              />
              <Button
                className="bg-[#D92C4A] text-white p-3 rounded-lg"
                value="Cancel"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to submit this question?"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            setShowConfirmation(false);
            // Additional actions after confirming, if needed
          }}
        />
      )}

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
              <span className="text-[#3A3A3A]">{question.title}</span>
              <Button
                className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
                value={<MdOutlineCancel size={18} />}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(question.id);
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
    <div className="w-full h-full bg-white rounded-lg p-4 text-lg">
      <div className="flex flex-col gap-4 text-[#A44B6F]/30">
        {selectedQuestion ? (
          <div className="flex flex-col gap-6">
            {/* Display trimmed title */}
            <span className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]">
              {selectedQuestion.title.length > 30
                ? `${selectedQuestion.title.slice(0, 30)}...`
                : selectedQuestion.title}
            </span>

            {/* Display content with text wrap */}
            <span className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5] text-wrap">
              {selectedQuestion.content || "No content available."}
            </span>

            {/* Display answers */}
            <div className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]">
              <h4 className="font-medium text-[#3A3A3A]">Answers:</h4>
              <ul>
                {selectedQuestion.answers.map((answer, index) => (
                  <li
                    key={index}
                    className={`${
                      selectedQuestion.correct_answer.includes(answer)
                        ? "font-bold text-green-500"
                        : "text-[#3A3A3A]"
                    }`}
                  >
                    {answer}
                  </li>
                ))}
              </ul>
            </div>

            {/* Button to deselect question */}
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
