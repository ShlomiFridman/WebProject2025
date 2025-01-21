"use client";

import React, { useState } from "react";
import { TR_Event } from "@/utils/classes";
import { getLoggedAccount } from "@/utils/util_client";

type CreateEventFormProps = {
  onSuccess: () => void; // Callback to refresh the event list
  onEventCreated: (newEvent: TR_Event) => void; // Add onEventCreated prop
};

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess, onEventCreated }) => {
  const loggedAccount = getLoggedAccount();
  const [formData, setFormData] = useState<Partial<TR_Event>>({
    creator_username: loggedAccount?.username || "",
    openDays: Array(7).fill(false),
    isActive: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null); // To store the uploaded image
  const [imageError, setImageError] = useState<string | null>(null); // To store image validation error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (index: number) => {
    const updatedDays = [...(formData.openDays || [])];
    updatedDays[index] = !updatedDays[index];
    setFormData({ ...formData, openDays: updatedDays });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "image/jpeg") {
      setImage(file);
      setImageError(null);
    } else {
      setImage(null);
      setImageError("Only .jpg files are allowed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate || !formData.openDays?.includes(true)) {
      setError("Please fill in all required fields and select at least one open day.");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError("Start date cannot be after the end date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(formData));

      // If there is an image, append it to the form data
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await fetch("/api/events/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const newEvent = await response.json(); // Assuming the response contains the new event
      onEventCreated(newEvent); // Trigger the onEventCreated callback

      setFormData({ creator_username: loggedAccount?.username || "", openDays: Array(7).fill(false), isActive: true });
      setImage(null); // Clear the selected image after successful submission
      onSuccess(); // Refresh event list
    } catch (err) {
      console.error(err);
      setError("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block font-semibold mb-1">Event Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Phone *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Start Date *</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">End Date *</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Open Days *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.openDays?.[index] || false}
                onChange={() => handleCheckboxChange(index)}
                className="mr-1"
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Event Type</label>
        <input
          type="text"
          name="eventType"
          value={formData.eventType || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload Image (JPG only)</label>
        <input
          type="file"
          accept=".jpg"
          onChange={handleFileChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        {imageError && <div className="text-red-600">{imageError}</div>}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive || false}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="mr-2"
          />
          Active Event
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEventForm;
