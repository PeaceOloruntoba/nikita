import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";

const VITE_CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const VITE_CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET;

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { updateProfile, getProfile, profile: storedProfile } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    restaurant_name: "",
    restaurant_address: "",
    cuisine_type: "",
    service_style: "",
    seating_capacity: "",
    menu_text: "",
    wine_menu_text: "",
    ai_languages: [],
    ai_communication_style: "",
    ai_personality: "",
    legal_representative: "",
    contact_phone: "",
    email: "",
    website: "",
    exclusive_dishes: "",
    seasonal_menu: false,
    menu_update_frequency: "",
    daily_menu: false,
    staff_using_ai: "",
    video_support: false,
    additional_features: "",
    restaurant_image: null,
    food_menu_card_image: null,
    wine_menu_card_image: null,
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
        menu_text: Array.isArray(storedProfile.food_menu)
          ? storedProfile.food_menu.join("\n")
          : typeof storedProfile.food_menu === "string"
          ? storedProfile.food_menu
          : "",
        wine_menu_text: Array.isArray(storedProfile.wine_menu)
          ? storedProfile.wine_menu.join("\n")
          : typeof storedProfile.wine_menu === "string"
          ? storedProfile.wine_menu
          : "",
        ai_languages: storedProfile.ai_languages || [],
        ai_communication_style: storedProfile.ai_communication_style || "",
        ai_personality: storedProfile.ai_personality || "",
        legal_representative: storedProfile.legal_representative || "",
        contact_phone: storedProfile.contact_phone || "",
        email: storedProfile.email || "",
        website: storedProfile.website || "",
        exclusive_dishes: storedProfile.exclusive_dishes || "",
        seasonal_menu: storedProfile.seasonal_menu || false,
        menu_update_frequency: storedProfile.menu_update_frequency || "",
        daily_menu: storedProfile.daily_menu || false,
        staff_using_ai: storedProfile.staff_using_ai || "",
        video_support: storedProfile.video_support || false,
        additional_features: storedProfile.additional_features || "",
        restaurant_image: null,
        food_menu_card_image: null,
        wine_menu_card_image: null,
      });
    }
  }, [storedProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ai_languages: checked
        ? [...prevData.ai_languages, value]
        : prevData.ai_languages.filter((lang) => lang !== value),
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleCloudinaryUpload = async (file, preset) => {
    if (!file) return null;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const formData = new FormData();
          formData.append("file", reader.result);
          formData.append("upload_preset", preset);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formData
          );

          resolve(response.data.secure_url);
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          reject(null);
        }
      };

      reader.onerror = () => {
        console.error("FileReader error");
        reject(null);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const [restaurantImageUrl, foodMenuCardImageUrl, wineMenuCardImageUrl] =
        await Promise.all([
          handleCloudinaryUpload(formData.restaurant_image, preset),
          handleCloudinaryUpload(formData.food_menu_card_image, preset),
          handleCloudinaryUpload(formData.wine_menu_card_image, preset),
        ]);

      const payload = {
        ...formData,
        restaurant_image: restaurantImageUrl || formData.restaurant_image, // Retain existing value if upload fails
        food_menu_card_image:
          foodMenuCardImageUrl || formData.food_menu_card_image,
        wine_menu_card_image:
          wineMenuCardImageUrl || formData.wine_menu_card_image,
      };

      updateProfile(payload, navigate);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white border-primary shadow-secondary rounded-lg w-full max-w-lg p-6 sm:p-8 mx-4 sm:mx-0 z-50">
        <h2 className="text-primary text-xl font-semibold text-center mb-6">
          Update Profile
        </h2>

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

        {step === 3 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 3: Additional Restaurant Information
            </h3>

            <label className="block text-primary">Legal Representative</label>
            <input
              type="text"
              name="legal_representative"
              value={formData.legal_representative}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Contact Phone</label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
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

        {step === 4 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 4: Seating & Capacity
            </h3>

            <label className="block text-primary">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex gap-6 mb-3">
              <div className="flex gap-2 items-center">
                <label className="block text-primary">Seasonal Menu</label>
                <input
                  type="checkbox"
                  name="seasonal_menu"
                  checked={formData.seasonal_menu}
                  onChange={handleChange}
                  className="mr-2"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="block text-primary">Daily Menu</label>
                <input
                  type="checkbox"
                  name="daily_menu"
                  checked={formData.daily_menu}
                  onChange={handleChange}
                  className="mr-2"
                />
              </div>
            </div>
            <label className="block text-primary">Menu Update Frequency</label>
            <input
              type="text"
              name="menu_update_frequency"
              value={formData.menu_update_frequency}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Staff Using AI</label>
            <input
              type="text"
              name="staff_using_ai"
              value={formData.staff_using_ai}
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

        {step === 5 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 5: Menu Information
            </h3>

            <label className="block text-primary">Food Menu</label>
            <input type="file" name="food_menu" id="" />
            <textarea
              name="menu_text"
              value={formData.menu_text}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            ></textarea>

            <label className="block text-primary">Wine Menu</label>
            <input type="file" name="wine_menu" id="" />
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

        {step === 6 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 6: AI Configuration & Images
            </h3>

            <label className="block text-primary">Main Languages</label>
            <input
              type="text"
              name="ai_languages"
              value={formData.ai_languages}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">
              AI Character Instructions
            </label>
            <input
              type="text"
              name="ai_character_instructions"
              value={formData.ai_character_instructions}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">AI Avatar</label>
            <div className="mb-3 flex items-center text-nowrap flex-wrap justify-center w-full">
              <label className="text-nowrap">
                <input
                  type="checkbox"
                  name="text_support"
                  checked={formData.text_support}
                  onChange={handleChange}
                  className="mr-2"
                />
                Text ($180)
              </label>
              <label className="ml-9">
                <input
                  type="checkbox"
                  name="audio_support"
                  checked={formData.audio_support}
                  onChange={handleChange}
                  className="mr-2"
                />
                Text + Audio ($360)
              </label>
              <label className="ml-2">
                <input
                  type="checkbox"
                  name="video_support"
                  checked={formData.video_support}
                  onChange={handleChange}
                  className="mr-2"
                />
                Text + Audio + Video ($1200)
              </label>
            </div>

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

        {step === 7 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 7: Restaurant Images
            </h3>

            <label className="block text-primary">Restaurant Image</label>
            <input
              type="file"
              name="restaurant_image"
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Food Menu Card Image</label>
            <input
              type="file"
              name="food_menu_card_image"
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Wine Menu Card Image</label>
            <input
              type="file"
              name="wine_menu_card_image"
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
                onClick={handleSubmit}
                className={`bg-primary text-white px-4 py-2 rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
