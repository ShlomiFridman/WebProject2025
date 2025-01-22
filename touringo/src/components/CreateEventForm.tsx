import React, { useState, useRef, useEffect } from "react";
import { TR_Event, TR_Image } from "@/utils/classes";
import { getLoggedAccount } from "@/utils/util_client";
import { encryptData } from "@/utils/utils";

interface CreateEventFormProps {
  onSuccess: () => void;
  onEventCreated: (newEvent: TR_Event) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess, onEventCreated }) => {
  const loggedAccount = getLoggedAccount();
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<Partial<TR_Event>>({
    creator_username: loggedAccount?.username || "",
    openDays: Array(7).fill(false),
    isActive: true,
    startDate: today,
    endDate: today,
    openingTime: "09:00", // Default opening time
    closingTime: "18:00", // Default closing time
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<TR_Image[] | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formData.startDate) {
      const today = new Date().toISOString().split("T")[0];
      if (formData.startDate < today) {
        setFormData({ ...formData, startDate: today });
      }
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        setFormData((prevData) => ({
          ...prevData,
          endDate: prevData.startDate || today,
        }));
      }
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^[0-9]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedDays = [...(formData.openDays || [])];
    updatedDays[index] = !updatedDays[index];
    setFormData({ ...formData, openDays: updatedDays });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgBuffer = reader.result as ArrayBuffer;
        const newImage = new TR_Image(
          file.name,
          imgBuffer ? Buffer.from(imgBuffer) : null,
          URL.createObjectURL(file),
          file.type
        );
        setImage([newImage]);
        setImageError(null);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setImage(null);
      setImageError("Only .jpg files are allowed.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.description &&
      formData.eventType &&
      formData.startDate &&
      formData.endDate &&
      formData.openDays?.includes(true) &&
      image
    ) {
      setIsSubmitting(true);
      const username = getLoggedAccount()?.username;
      if (!username) return;

      const newEvent = new TR_Event(
        -1,
        formData.name,
        formData.description,
        formData.phone || "",
        username,
        image,
        formData.openingTime || "00:00",
        formData.closingTime || "23:59",
        formData.startDate || "",
        formData.endDate || "",
        formData.town || "",
        formData.address || "",
        formData.openDays || Array(7).fill(false),
        formData.eventType || "",
        formData.isActive
      );
      createEvent(newEvent);
    } else {
      setError("Please fill all required fields and upload an image.");
    }
  };

  const createEvent = (event: TR_Event) => {
    fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify({ data: encryptData({ event }) }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((resBody) => {
        if (resBody.message) alert(resBody.message);
        else {
          onEventCreated(resBody.result as TR_Event);
          setFormData({ creator_username: loggedAccount?.username || "", openDays: Array(7).fill(false), isActive: true });
          onSuccess();
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded dark:text-white">
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
          value={formData.startDate || today}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          min={today}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">End Date *</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate || formData.startDate || today}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          min={formData.startDate || today}
          disabled={!formData.startDate}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Opening Time *</label>
        <input
          type="time"
          name="openingTime"
          value={formData.openingTime || "09:00"}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Closing Time *</label>
        <input
          type="time"
          name="closingTime"
          value={formData.closingTime || "18:00"}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Town *</label>
        <input
          type="text"
          name="town"
          value={formData.town || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
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
        <label className="block font-semibold mb-1">Event Type *</label>
        <input
          type="text"
          name="eventType"
          value={formData.eventType || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload Event Image *</label>
        <input
          type="file"
          accept=".jpg"
          onChange={handleFileChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
        {imageError && <div className="text-red-600 mt-2">{imageError}</div>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {isSubmitting ? "Submitting..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEventForm;
