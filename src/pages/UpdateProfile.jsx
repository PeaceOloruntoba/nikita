import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuthStore(); // Use Zustand store function
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    restaurant_name: "",
    restaurant_address: "",
    cuisine_type: "",
    service_style: "",
    menu_text: "",
    wine_menu_text: "",
    ai_languages: [],
    ai_communication_style: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multi-select checkboxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ai_languages: checked
        ? [...prevData.ai_languages, value]
        : prevData.ai_languages.filter((lang) => lang !== value),
    }));
  };

  // Move between steps
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Submit Profile using Zustand
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, navigate);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-center mb-4">Update Profile</h2>

      {step === 1 && (
        <div>
          <h3 className="font-medium">Step 1: General Information</h3>
          <label className="block">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={nextStep}
            className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-medium">Step 2: Restaurant Details</h3>
          <label className="block">Restaurant Name</label>
          <input
            type="text"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-2">Restaurant Address</label>
          <input
            type="text"
            name="restaurant_address"
            value={formData.restaurant_address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-2">Cuisine Type</label>
          <input
            type="text"
            name="cuisine_type"
            value={formData.cuisine_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-2">Service Style</label>
          <input
            type="text"
            name="service_style"
            value={formData.service_style}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={prevStep}
            className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-medium">Step 3: Menu & AI Preferences</h3>
          <label className="block">Food Menu</label>
          <textarea
            name="menu_text"
            value={formData.menu_text}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>

          <label className="block mt-2">Wine Menu</label>
          <textarea
            name="wine_menu_text"
            value={formData.wine_menu_text}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>

          <label className="block mt-2">AI Languages</label>
          <div>
            {["English", "French", "Spanish", "German", "Italian"].map(
              (lang) => (
                <label key={lang} className="inline-flex items-center mr-3">
                  <input
                    type="checkbox"
                    value={lang}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-1">{lang}</span>
                </label>
              )
            )}
          </div>

          <label className="block mt-2">AI Communication Style</label>
          <input
            type="text"
            name="ai_communication_style"
            value={formData.ai_communication_style}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={prevStep}
            className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white p-2 rounded w-full"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
