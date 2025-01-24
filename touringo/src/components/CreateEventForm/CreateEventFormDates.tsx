import React from "react";
import { TR_Event } from "@/utils/classes";

interface CreateEventFormDatesProps {
  formData: Partial<TR_Event>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<TR_Event>>>;
  disabledDays: boolean[];
  setDisabledDays: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const CreateEventFormDates: React.FC<CreateEventFormDatesProps> = ({ formData, setFormData, disabledDays }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-semibold mb-1">Start Date *</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ""}
          onChange={handleDateChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">End Date *</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate || ""}
          onChange={handleDateChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
    </div>
  );
};
