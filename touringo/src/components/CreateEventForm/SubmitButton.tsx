import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full p-2 rounded  ${isSubmitting
          ? "bg-gray-500 cursor-not-allowed dark:bg-gray-600"
          : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"}`}
    >
      {isSubmitting ? "Submitting..." : "Create Event"}
    </button>
  </div>
);

export default SubmitButton;
