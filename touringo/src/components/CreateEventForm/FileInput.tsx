import Image from "next/image";

interface FileInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  preview: string | null;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange, error, preview }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">{label} *</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
    />
    {error && <div className="text-red-600 mt-2">{error}</div>}
    {preview && (
      <div className="mt-4">
        <label className="block font-semibold mb-1">Image Preview</label>
        <Image
          priority
          unoptimized
          src={preview}
          alt="Event preview"
          className="max-w-full h-auto rounded-lg object-cover"
          width={150}
          height={100}
        />
      </div>
    )}
  </div>
);
