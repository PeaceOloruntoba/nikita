import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { updateProfile, getProfile, profile: storedProfile } = useAuthStore();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    restaurant_name: "",
    restaurant_address: "",
    cuisine_type: "",
    service_style: "",
    seating_capacity: "",
    tables_count: "",
    menu_text: "",
    wine_menu_text: "",
    ai_languages: [],
    ai_communication_style: "",
    ai_personality: "",
    ai_tone: "",
  });

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (storedProfile) {
      setFormData({
        first_name: storedProfile.first_name || "",
        last_name: storedProfile.last_name || "",
        location: storedProfile.location || "",
        restaurant_name: storedProfile.restaurant_name || "",
        restaurant_address: storedProfile.restaurant_address || "",
        cuisine_type: storedProfile.cuisine_type || "",
        service_style: storedProfile.service_style || "",
        seating_capacity: storedProfile.seating_capacity || "",
        tables_count: storedProfile.tables_count || "",
        menu_text: storedProfile.menu_text || "",
        wine_menu_text: storedProfile.wine_menu_text || "",
        ai_languages: storedProfile.ai_languages || [],
        ai_communication_style: storedProfile.ai_communication_style || "",
        ai_personality: storedProfile.ai_personality || "",
        ai_tone: storedProfile.ai_tone || "",
      });
    }
  }, [storedProfile]);

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
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit Profile using Zustand
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, navigate);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white border-primary shadow-secondary rounded-lg w-full max-w-lg p-6 sm:p-8 mx-4 sm:mx-0">
        <h2 className="text-primary text-xl font-semibold text-center mb-6">
          Update Profile
        </h2>

        {/* Step 1: General Information */}
        {step === 1 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 1: General Information
            </h3>

            <label className="block text-primary">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <button
              onClick={nextStep}
              className="w-full bg-primary text-white p-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Restaurant Details */}
        {step === 2 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 2: Restaurant Details
            </h3>

            <label className="block text-primary">Restaurant Name</label>
            <input
              type="text"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Restaurant Address</label>
            <input
              type="text"
              name="restaurant_address"
              value={formData.restaurant_address}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Cuisine Type</label>
            <input
              type="text"
              name="cuisine_type"
              value={formData.cuisine_type}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Service Style</label>
            <input
              type="text"
              name="service_style"
              value={formData.service_style}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-secondary text-primary px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Seating & Tables */}
        {step === 3 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 3: Seating & Tables
            </h3>

            <label className="block text-primary">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Number of Tables</label>
            <input
              type="number"
              name="tables_count"
              value={formData.tables_count}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-secondary text-primary px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Menu Information */}
        {step === 4 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 4: Menu Information
            </h3>

            <label className="block text-primary">Food Menu</label>
            <textarea
              name="menu_text"
              value={formData.menu_text}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            ></textarea>

            <label className="block text-primary">Wine Menu</label>
            <textarea
              name="wine_menu_text"
              value={formData.wine_menu_text}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            ></textarea>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-secondary text-primary px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 5: AI Configuration */}
        {step === 5 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 5: AI Configuration
            </h3>

            <label className="block text-primary">AI Communication Style</label>
            <input
              type="text"
              name="ai_communication_style"
              value={formData.ai_communication_style}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">AI Personality</label>
            <input
              type="text"
              name="ai_personality"
              value={formData.ai_personality}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">AI Tone</label>
            <input
              type="text"
              name="ai_tone"
              value={formData.ai_tone}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-secondary text-primary px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
