import React, { useState, useEffect, useRef } from "react";
import { TR_Event, TR_Image } from "@/utils/classes";
import { getLoggedAccount, ImageElement } from "@/utils/util_client";
import { encryptData } from "@/utils/utils";
import FormHeader from "./FormHeader";
import ErrorMessage from "./ErrorMessage";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import CheckboxGroup from "./CheckBoxGroup";
import FileUpload from "./FileUpload";
import SubmitButton from "./SubmitButton";


interface CreateEventFormProps {
  onSuccess: () => void;
  onEventCreated: (newEvent: TR_Event) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess, onEventCreated }) => {
  const loggedAccount = getLoggedAccount();
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const todayStr = today.toISOString().split("T")[0];

  const [formData, setFormData] = useState<Partial<TR_Event>>({
    creator_username: loggedAccount?.username || "",
    openDays: Array(7).fill(false),
    isActive: true,
    startDate: todayStr,
    endDate: todayStr,
    openingTime: "09:00",
    closingTime: "18:00",
  });
  const [disabledDays, setDisabledDays] = useState<boolean[]>(Array(7).fill(false));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<TR_Image[] | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate < startDate) {
        setFormData((prev) => ({ ...prev, endDate: formData.startDate || todayStr }));
      }

      const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      const updatedDisabledDays = Array(7).fill(true);
      for (let i = 0; i <= daysBetween; i++) {
        const currentDate = new Date(formData.startDate!);
        currentDate.setDate(currentDate.getDate() + i);
        updatedDisabledDays[currentDate.getDay()] = false;
      }
      setDisabledDays(updatedDisabledDays);

      if (formData.openDays) {
        setFormData((prev) => ({
          ...prev,
          openDays: prev.openDays!.map((day, i) => (updatedDisabledDays[i] ? false : day)),
        }));
      }
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" && !/^[0-9]*$/.test(value) ? prev[name] : value,
    }));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedDays = [...(formData.openDays || [])];
    updatedDays[index] = !updatedDays[index];
    setFormData({ ...formData, openDays: updatedDays });
  };

  const handleFileChange = (file: File | null) => {
    if (file && file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgBuffer = reader.result as ArrayBuffer;
        const previewUrl = URL.createObjectURL(file);
        const newImage = new TR_Image(
          file.name,
          imgBuffer ? Buffer.from(imgBuffer) : null,
          previewUrl,
          file.type
        );
        setImage([newImage]);
        setImagePreview(previewUrl);
        setImageError(null);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setImage(null);
      setImagePreview(null);
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
      createEvent(newEvent);
    } else {
      setError("Please Choose at least one day");
    }
  };

  const createEvent = (event: TR_Event) => {
    fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify({ data: encryptData({ event }) }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.statusText))
      .then((resBody) => {
        onEventCreated(resBody.result as TR_Event);
        setFormData({ creator_username: loggedAccount?.username || "", openDays: Array(7).fill(false), isActive: true });
        onSuccess();
      })
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded dark:text-white">
      <FormHeader title="Create New Event" subTitle={"All fields are requaired"} />
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
      <FileUpload label="Upload Event Image" accept=".jpg" onChange={handleFileChange} error={imageError} />
      {imagePreview && <ImageElement src={imagePreview} title={"imagePreview"} />}
      <SubmitButton isSubmitting={isSubmitting} />
      {error && <ErrorMessage message={error} />}

    </form>
  );
};

export default CreateEventForm;
