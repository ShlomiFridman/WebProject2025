import React from "react";
import Image from "next/image";
import { TR_Event } from "@/utils/classes";

interface CreateEventFormImageProps {
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<TR_Event>>>;
}

export const CreateEventFormImage: React.FC<CreateEventFormImageProps> = ({ imagePreview, setImagePreview, setFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  return (
    <>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload Image *</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
      </div>
      {imagePreview && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Image Preview</label>
          <Image src={imagePreview} alt="Preview" width={150} height={100} className="rounded-lg" />
        </div>
      )}
    </>
  );
};
