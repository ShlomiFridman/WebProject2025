import { myStyles } from "@/components/styles";
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
          : myStyles.button_blue}`}
    >
      {isSubmitting ? "Submitting..." : "Create Event"}
    </button>
  </div>
);

export default SubmitButton;
