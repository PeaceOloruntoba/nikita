import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import OpenAI from "openai";
import axiosInstance from "../utils/axiosConfig";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import mammoth from "mammoth";

const extractTextFromDOCX = async (file) => {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const result = await mammoth.extractRawText({
          arrayBuffer: event.target.result,
        });
        resolve(result.value.trim());
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const extractTextFromPDF = async (file) => {
  if (!file) return null;

  try {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let extractedText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            extractedText +=
              textContent.items.map((item) => item.str).join(" ") + "\n";
          }

          resolve(extractedText.trim());
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return null;
  }
};

const extractTextFromTXT = (file) => {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result.trim());
    reader.onerror = (error) => reject(error);

    reader.readAsText(file);
  });
};


const extractTextFromImage = async (file) => {
  if (!file) return null;

  try {
    const { data } = await Tesseract.recognize(file, "eng");
    return data.text.trim();
  } catch (error) {
    console.error("Error extracting text from image:", error);
    return null;
  }
};


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
    food_menu: "", // Will be an array after OpenAI processing
    wine_menu: "", // Will be an array after OpenAI processing
    ai_languages: "",
    ai_character_instructions: "",
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
    audio_support: false,
    text_support: false,
    restaurant_image: null,
    food_menu_file: null, // Store the file for OpenAI
    wine_menu_file: null, // Store the file for OpenAI
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
        food_menu: Array.isArray(storedProfile.food_menu)
          ? storedProfile.food_menu.join("\n")
          : typeof storedProfile.food_menu === "string"
          ? storedProfile.food_menu
          : "",
        wine_menu: Array.isArray(storedProfile.wine_menu)
          ? storedProfile.wine_menu.join("\n")
          : typeof storedProfile.wine_menu === "string"
          ? storedProfile.wine_menu
          : "",
        ai_languages: storedProfile.ai_languages || "",
        ai_character_instructions:
          storedProfile.ai_character_instructions || "",
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
        audio_support: storedProfile.audio_support || false,
        text_support: storedProfile.text_support || false,
        restaurant_image: null,
        food_menu_file: null,
        wine_menu_file: null,
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
          formData.append("upload_preset", preset); // Ensure preset is used

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

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const processMenuWithOpenAI = async (file) => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("extract-content", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const extractedText = response.data.text;

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Extract the menu from this text: ${extractedText}. Output the menu as a javascript array of strings.`,
          },
        ],
        max_tokens: 1000,
      });

      const menuText = chatCompletion.choices[0].message.content;

      try {
        const menuArray = JSON.parse(menuText);
        return menuArray;
      } catch (e) {
        console.error("Error parsing menu from OpenAI response:", e);
        return null;
      }
    } catch (error) {
      console.error("OpenAI processing error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const [
        restaurantImageUrl,
        foodMenuCardImageUrl,
        wineMenuCardImageUrl,
        foodMenuArray,
        wineMenuArray,
      ] = await Promise.all([
        handleCloudinaryUpload(formData.restaurant_image, preset),
        handleCloudinaryUpload(formData.food_menu_card_image, preset),
        handleCloudinaryUpload(formData.wine_menu_card_image, preset),
        processMenuWithOpenAI(formData.food_menu_file),
        processMenuWithOpenAI(formData.wine_menu_file),
      ]);

      const payload = {
        ...formData,
        restaurant_image: restaurantImageUrl || formData.restaurant_image,
        food_menu: foodMenuArray || formData.food_menu,
        wine_menu: wineMenuArray || formData.wine_menu,
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
              placeholder="Number of tables you have"
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
              placeholder="Name Surname"
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
            <input
              onChange={handleChange}
              type="file"
              name="food_menu_file"
              id=""
              className="w-full p-2 border border-primary rounded mb-3"
            />

            <label className="block text-primary">Wine Menu</label>
            <input
              onChange={handleChange}
              type="file"
              name="wine_menu_file"
              id=""
              className="w-full p-2 border border-primary rounded mb-3"
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
              placeholder="Character, Tone..."
              name="ai_character_instructions"
              value={formData.ai_character_instructions}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">AI Avatar</label>
            <div className="mb-3 flex items-center text-nowrap flex-wrap justify-center w-full">
              <label className="text-nowrap">
                <input
                  type="radio"
                  name="ai_avatar_type"
                  value="text"
                  checked={formData.text_support}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      text_support: true,
                      audio_support: false,
                      video_support: false,
                    })
                  }
                  className="mr-2"
                />
                Text ($180)
              </label>
              <label className="ml-9">
                <input
                  type="radio"
                  name="ai_avatar_type"
                  value="audio"
                  checked={formData.audio_support}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      text_support: false,
                      audio_support: true,
                      video_support: false,
                    })
                  }
                  className="mr-2"
                />
                Text + Audio ($360)
              </label>
              <label className="ml-2">
                <input
                  type="radio"
                  name="ai_avatar_type"
                  value="video"
                  checked={formData.video_support}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      text_support: false,
                      audio_support: false,
                      video_support: true,
                    })
                  }
                  className="mr-2"
                />
                Text + Audio + Video ($1200)
              </label>
              <label className="ml-2">
                <input
                  type="radio"
                  name="ai_avatar_type"
                  value="none"
                  checked={
                    !formData.text_support &&
                    !formData.audio_support &&
                    !formData.video_support
                  }
                  onChange={() =>
                    setFormData({
                      ...formData,
                      text_support: false,
                      audio_support: false,
                      video_support: false,
                    })
                  }
                  className="mr-2"
                />
                None
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
                {loading ? <Spinner /> : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
