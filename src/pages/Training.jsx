// src/pages/Training.js
import React, { useEffect, useState } from "react";
import useQuestionStore from "../store/useQuestionStore";
import Modal from "../components/ui/Modal";
import { toast } from "sonner"; // Using sonner for toast notifications

export default function Training() {
  const {
    questions,
    selectedQuestion,
    isLoading,
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    selectQuestion,
    deselectQuestion,
  } = useQuestionStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: "", answer: "" });

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
    setNewQuestion({ question: "", answer: "" });
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalOpen = (question) => {
    selectQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    deselectQuestion();
  };

  const handleDeleteModalOpen = (question) => {
    selectQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    deselectQuestion();
  };

  const handleAddQuestion = async () => {
    try {
      await createQuestion(newQuestion);
      handleAddModalClose();
      setNewQuestion({ question: "", answer: "" });
    } catch (error) {
      toast.error("Failed to add question.");
    }
  };

  const handleUpdateQuestion = async () => {
    if (selectedQuestion) {
      try {
        await updateQuestion(selectedQuestion.id, {
          question: selectedQuestion.question,
          answer: selectedQuestion.answer,
        });
        handleEditModalClose();
      } catch (error) {
        toast.error("Failed to update question.");
      }
    }
  };

  const handleDelete = async () => {
    if (selectedQuestion) {
      try {
        await deleteQuestion(selectedQuestion.id);
        handleDeleteModalClose();
      } catch (error) {
        toast.error("Failed to delete question.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">AI Training</h1>
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-700"
          onClick={handleAddModalOpen}
        >
          Add Question
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="flex items-start border border-gray-300 rounded-md p-4"
            >
              <div className="w-16 flex flex-col items-center mr-4">
                <button
                  className="text-blue-600 mb-2"
                  onClick={() => handleEditModalOpen(question)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteModalOpen(question)}
                >
                  Delete
                </button>
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold">Q: {question.question}</div>
                <div className="mt-2 font-semibold">A: {question.answer}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={handleAddModalClose}>
        <h2 className="text-lg font-semibold mb-4">Add Question</h2>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          placeholder="Answer"
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answer: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-700"
          onClick={handleAddQuestion}
        >
          Add
        </button>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <h2 className="text-lg font-semibold mb-4">Edit Question</h2>
        <input
          type="text"
          value={selectedQuestion?.question || ""}
          onChange={(e) =>
            selectQuestion({ ...selectedQuestion, question: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          value={selectedQuestion?.answer || ""}
          onChange={(e) =>
            selectQuestion({ ...selectedQuestion, answer: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-700"
          onClick={handleUpdateQuestion}
        >
          Update
        </button>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose}>
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this question?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 py-2 px-4 rounded mr-2"
            onClick={handleDeleteModalClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
