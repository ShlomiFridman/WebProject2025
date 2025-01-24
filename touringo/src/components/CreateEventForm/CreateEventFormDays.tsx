import React from "react";
import { TR_Event } from "@/utils/classes";

interface CreateEventFormDaysProps {
  formData: Partial<TR_Event>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<TR_Event>>>;
  disabledDays: boolean[];
}

export const CreateEventFormDays: React.FC<CreateEventFormDaysProps> = ({ formData, setFormData, disabledDays }) => {
  const handleCheckboxChange = (index: number) => {
    const openDays = [...(formData.openDays || Array(7).fill(false))];
    openDays[index] = !openDays[index];
    setFormData({ ...formData, openDays });
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Open Days *</label>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.openDays?.[index] || false}
              onChange={() => handleCheckboxChange(index)}
              disabled={disabledDays[index]}
              className="mr-1"
            />
            {day}
          </label>
        ))}
      </div>
    </div>
  );
};
