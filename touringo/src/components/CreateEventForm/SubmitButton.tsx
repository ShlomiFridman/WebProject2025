import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full p-2 rounded text-white ${
        isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
      }`}
    >
      {isSubmitting ? "Submitting..." : "Create Event"}
    </button>
  </div>
);

export default SubmitButton;
