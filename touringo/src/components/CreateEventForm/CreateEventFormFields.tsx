import React from "react";
import { TR_Event } from "@/utils/classes";

interface CreateEventFormFieldsProps {
  formData: Partial<TR_Event>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<TR_Event>>>;
}

export const CreateEventFormFields: React.FC<CreateEventFormFieldsProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Event Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
    </>
  );
};
