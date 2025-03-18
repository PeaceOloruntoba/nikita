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
    menu_text: "",
    wine_menu_text: "",
    ai_languages: [],
    ai_communication_style: "",
    ai_personality: "",
    ai_tone: "",
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
        menu_text: storedProfile.food_menu
          ? JSON.stringify(storedProfile.food_menu, null, 2)
          : "",
        wine_menu_text: storedProfile.wine_menu
          ? JSON.stringify(storedProfile.wine_menu, null, 2)
          : "",
        ai_languages: storedProfile.ai_languages || [],
        ai_communication_style: storedProfile.ai_communication_style || "",
        ai_personality: storedProfile.ai_personality || "",
        ai_tone: storedProfile.ai_tone || "",
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
      });
    }
  }, [storedProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const foodMenuArray = formData.menu_text
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);

    const wineMenuArray = formData.wine_menu_text
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);

    const updatedFormData = {
      ...formData,
      food_menu: foodMenuArray,
      wine_menu: wineMenuArray,
    };

    updateProfile(updatedFormData, navigate);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white border-primary shadow-secondary rounded-lg w-full max-w-lg p-6 sm:p-8 mx-4 sm:mx-0">
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

            <label className="block text-primary">Exclusive Dishes</label>
            <input
              type="text"
              name="exclusive_dishes"
              value={formData.exclusive_dishes}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Seasonal Menu</label>
            <input
              type="checkbox"
              name="seasonal_menu"
              checked={formData.seasonal_menu}
              onChange={handleChange}
              className="mr-2"
            />

            <label className="block text-primary">Menu Update Frequency</label>
            <input
              type="text"
              name="menu_update_frequency"
              value={formData.menu_update_frequency}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block text-primary">Daily Menu</label>
            <input
              type="checkbox"
              name="daily_menu"
              checked={formData.daily_menu}
              onChange={handleChange}
              className="mr-2"
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

        {step === 6 && (
          <div>
            <h3 className="text-primary font-medium mb-4">
              Step 6: AI Configuration
            </h3>

            <label className="block text-primary">AI Languages</label>
            <div className="mb-3">
              <label>
                <input
                  type="checkbox"
                  value="Russian"
                  checked={formData.ai_languages.includes("Russian")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Russian
              </label>
              <label className="ml-2">
                <input
                  type="checkbox"
                  value="English"
                  checked={formData.ai_languages.includes("English")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                English
              </label>
              <label className="ml-2">
                <input
                  type="checkbox"
                  value="French"
                  checked={formData.ai_languages.includes("French")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                French
              </label>
              <label className="ml-2">
                <input
                  type="checkbox"
                  value="Spanish"
                  checked={formData.ai_languages.includes("Spanish")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Spanish
              </label>
              <label className="ml-2">
                <input
                  type="checkbox"
                  value="German"
                  checked={formData.ai_languages.includes("German")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                German
              </label>
              <label className="ml-2">
                <input
                  type="checkbox"
                  value="Italian"
                  checked={formData.ai_languages.includes("Italian")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Italian
              </label>
            </div>

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

            <label className="block text-primary">Video Support</label>
            <input
              type="checkbox"
              name="video_support"
              checked={formData.video_support}
              onChange={handleChange}
              className="mr-2"
            />

            <label className="block text-primary">Additional Features</label>
            <input
              type="text"
              name="additional_features"
              value={formData.additional_features}
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
