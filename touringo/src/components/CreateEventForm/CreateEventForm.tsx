import React, { useState, useEffect, useRef } from "react"; // Import React and necessary hooks
import { TR_Event, TR_Image } from "@/utils/classes"; // Import event and image class definitions
import { getLoggedAccount, ImageElement } from "@/utils/util_client"; // Import utility functions for account and image rendering
import { encryptData } from "@/utils/utils"; // Import encryption utility
import FormHeader from "./FormHeader"; // Import the form header component
import ErrorMessage from "./ErrorMessage"; // Import error message display component
import TextInput from "./TextInput"; // Import text input component
import TextArea from "./TextArea"; // Import text area component
import DateInput from "./DateInput"; // Import date input component
import TimeInput from "./TimeInput"; // Import time input component
import CheckboxGroup from "./CheckBoxGroup"; // Import checkbox group component
import SubmitButton from "./SubmitButton"; // Import submit button component
import { myStyles } from "@/components/styles"; // Import custom styles

// Define interface for component props
interface CreateEventFormProps {
  onSuccess: () => void; // Callback when the event is successfully created
  onEventCreated: (newEvent: TR_Event) => void; // Callback when the event is created and returned
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess, onEventCreated }) => {
  // Fetch logged account information
  const loggedAccount = getLoggedAccount();

  // Set default value for today, one day ahead to ensure the event starts in the future
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const todayStr = today.toISOString().split("T")[0]; // Date format: YYYY-MM-DD

  // State variables for the form data
  const [formData, setFormData] = useState<Partial<TR_Event>>({
    creator_username: loggedAccount?.username || "", // Set the creator's username
    openDays: Array(7).fill(false), // Initially all days are set to false (not open)
    isActive: true, // Default event status is active
    startDate: todayStr, // Default start date is set to tomorrow
    endDate: todayStr, // Default end date is set to tomorrow
    openingTime: "09:00", // Default opening time
    closingTime: "18:00", // Default closing time
  });

  // State for disabled days based on the start and end dates
  const [disabledDays, setDisabledDays] = useState<boolean[]>(Array(7).fill(false));

  // Error state for displaying validation errors
  const [error, setError] = useState<string | null>(null);

  // State to manage form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for managing image URL and preview state
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<TR_Image[] | null>(null);
  const [tempImage, setTempImage] = useState<TR_Image[] | null>(null);

  // Reference for the form element
  const formRef = useRef<HTMLFormElement | null>(null);

  // Effect to handle the logic when the start date or end date changes
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      // Ensure end date is not before start date
      if (endDate < startDate) {
        setFormData((prev) => ({ ...prev, endDate: formData.startDate || todayStr }));
      }

      // Calculate the days between start and end dates
      const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      const updatedDisabledDays = Array(7).fill(true); // Initially all days are disabled
      for (let i = 0; i <= daysBetween; i++) {
        const currentDate = new Date(formData.startDate!);
        currentDate.setDate(currentDate.getDate() + i);
        updatedDisabledDays[currentDate.getDay()] = false; // Enable days between start and end
      }
      setDisabledDays(updatedDisabledDays);

      // Update openDays state based on disabled days
      if (formData.openDays) {
        setFormData((prev) => ({
          ...prev,
          openDays: prev.openDays!.map((day, i) => (updatedDisabledDays[i] ? false : day)),
        }));
      }
    }
  }, [formData.startDate, formData.endDate, todayStr]); // Trigger effect when dates change

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" && !/^[0-9]*$/.test(value) ? prev[name] : value, // Validate phone field for numbers only
    }));
  };

  // Handle checkbox state changes for open days
  const handleCheckboxChange = (index: number) => {
    const updatedDays = [...(formData.openDays || [])];
    updatedDays[index] = !updatedDays[index]; // Toggle day status
    setFormData({ ...formData, openDays: updatedDays });
  };

  // Handle URL change for image preview
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newImage = new TR_Image(
      formData.name ? formData.name : "Image Preview",
      null,
      value,
      "url"
    );
    setTempImage([newImage]); // Set the temporary image for preview
    setImageUrl(value); // Set the image URL
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields before submitting
    if (
      formData.name &&
      formData.description &&
      formData.eventType &&
      formData.startDate &&
      formData.endDate &&
      formData.openDays?.includes(true) &&
      image // Ensure image is selected
    ) {
      image[0].title = formData.name; // Set image title based on event name
      setIsSubmitting(true); // Set submitting state
      const newEvent = new TR_Event(
        -1,
        formData.name,
        formData.description,
        formData.phone || "",
        loggedAccount?.username || "",
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
      createEvent(newEvent); // Call API to create the event
    } else {
      if (!formData.openDays?.includes(true)) {
        setError("Please select at least one open day."); // Error if no open days are selected
      } else if (!image) {
        setError("Please preview an image before submitting."); // Error if no image is selected
      }
    }
  };


  // Create the event by sending a POST request to the server
  const createEvent = (event: TR_Event) => {
    fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify({ data: encryptData({ event }) }), // Encrypt event data before sending
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.statusText)) // Handle successful response
      .then((resBody) => {
        onEventCreated(resBody.result as TR_Event); // Invoke callback with the created event
        setFormData({ creator_username: loggedAccount?.username || "", openDays: Array(7).fill(false), isActive: true }); // Reset form state
        onSuccess(); // Invoke success callback
      })
      .catch(console.error) // Handle errors
      .finally(() => setIsSubmitting(false)); // Reset submitting state
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded">
      <FormHeader title="Create New Event" subTitle={"All fields are required"} />
      <TextInput label="Event Name" name="name" value={formData.name || ""} onChange={handleChange} required />
      <TextArea label="Description" name="description" value={formData.description || ""} onChange={handleChange} required />
      <TextInput label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} required />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DateInput label="Start Date" name="startDate" value={formData.startDate || todayStr} onChange={handleChange} min={todayStr} required />
        <DateInput label="End Date" name="endDate" value={formData.endDate || formData.startDate || todayStr} onChange={handleChange} min={formData.startDate || todayStr} required />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TimeInput label="Opening Time" name="openingTime" value={formData.openingTime || "09:00"} onChange={handleChange} required />
        <TimeInput label="Closing Time" name="closingTime" value={formData.closingTime || "18:00"} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextInput label="Town" name="town" value={formData.town || ""} onChange={handleChange} required />
        <TextInput label="Address" name="address" value={formData.address || ""} onChange={handleChange} required />
      </div>
      <CheckboxGroup
        label="Open Days"
        items={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        values={formData.openDays || Array(7).fill(false)}
        disabledItems={disabledDays}
        onChange={handleCheckboxChange}
      />
      <TextInput label="Event Type" name="eventType" value={formData.eventType || ""} onChange={handleChange} required />
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-5">
        <TextInput label="Image Url" name="imgUrl" value={imageUrl || ""} onChange={handleUrlChange} required />
        <button
          type="button"
          onClick={() => {
            setImage(tempImage); // Set preview image
          }}
          className={`w-full sm:w-auto px-4 py-2 m-2 rounded transition ${myStyles.button_green}`}
          value="Load"
        >
          Preview image
        </button>
        <button
          type="button"
          onClick={() => {
            setImage(null); // Clear image
            setImageUrl("");
          }}
          className={`w-full sm:w-auto px-4 py-2 m-2 rounded transition ${myStyles.button_red}`}
        >
          Clear
        </button>
      </div>
      {image && <ImageElement src={image[0].src} title={"imagePreview"} />} {/* Display image preview */}
      <SubmitButton isSubmitting={isSubmitting} /> {/* Submit button */}
      {error && <ErrorMessage message={error} />} {/* Display error message */}
    </form>
  );
};

export default CreateEventForm;
