import React from "react";

interface FileUploadProps {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
  error?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, accept, onChange, error }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input type="file" accept={accept} onChange={handleFileChange} />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
